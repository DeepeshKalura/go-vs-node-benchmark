# Stage 1: Build the binary
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY go.mod go.sum ./
# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application as a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go-app .

# Stage 2: Create the final, minimal image
FROM alpine:latest

# Import the binary from the builder stage
COPY --from=builder /go-app /go-app

EXPOSE 3001

# Run the binary
CMD ["/go-app"]
