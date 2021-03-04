package service

import (
	"context"
	"time"

	"github.com/sandokandias/grpc-consumer-research/internal/grpc/api"
)

// TimeService unary rpc service implementation
type TimeService struct {
	api.UnimplementedTimeServiceServer
}

// NewTimeService creates a new rpc unary service implementation
func NewTimeService() TimeService {
	return TimeService{}
}

// GetTime gets the server current time and returns in 2 formats: (unix, utc)
func (TimeService) GetTime(ctx context.Context, request *api.TimeRequest) (*api.TimeResponse, error) {
	now := time.Now()
	unix := now.Unix()
	utc := now.String()

	return &api.TimeResponse{
		Unix: unix,
		Utc:  utc,
	}, nil
}
