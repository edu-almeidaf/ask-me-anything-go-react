package api

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	"github.com/edu-almeidaf/ask-me-anything-go-react/internal/store/pgstore"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

func (h apiHandler) readRoom(
	w http.ResponseWriter,
	r *http.Request,
) (room pgstore.Room, rawRoomId string, roomID uuid.UUID, ok bool) {
	rawRoomId = chi.URLParam(r, "room_id")
	roomID, err := uuid.Parse(rawRoomId)
	if err != nil {
		http.Error(w, "invalid room id", http.StatusBadRequest)
		return pgstore.Room{}, "", uuid.UUID{}, false
	}

	room, err = h.q.GetRoom(r.Context(), roomID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, "room not found", http.StatusBadRequest)
			return pgstore.Room{}, "", uuid.UUID{}, false
		}

		slog.Error("Failed to get room", "error", err)
		http.Error(w, "something went wrong", http.StatusInternalServerError)
		return pgstore.Room{}, "", uuid.UUID{}, false
	}

	return room, rawRoomId, roomID, true
}

func sendJSON(w http.ResponseWriter, rawData any) {
	data, _ := json.Marshal(rawData)
	w.Header().Set("Content-Type", "application/json")
	_, _ = w.Write(data)
}
