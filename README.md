# MiniVault API

Local REST API that simulates running an LLM offline. Built for the ModelVault take-Home project.

## What it does

- `POST /generate` - returns AI-like responses (currently just stubbed)
- Logs everything to `logs/log.jsonl`
- Error logging to `logs/error.jsonl`
- `/status` endpoint shows uptime and memory usage
- Works in Docker

## Setup

Install and run:

```bash
npm install
npm start
```

Test it:

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, who are you?"}'
```

Or with Docker:

```bash
docker build -t minivault-api .
docker run -p 3000:3000 minivault-api
```

## Logs

- Request/response logs: `logs/log.jsonl` - one JSON object per line
- Error logs: `logs/error.jsonl` - structured error logging

## Status

Check if it's running:

```bash
curl http://localhost:3000/status
```

## Notes

- Responses are currently hardcoded - plan to integrate Ollama later
- Could add a CLI tool to make testing easier
- Memory tracking is basic but works for now
- Error handling fails silently to avoid cascading issues
