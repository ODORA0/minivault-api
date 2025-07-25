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

## TODO

- [ ] Integrate actual local LLM (Ollama?)
- [ ] Add CLI interface
- [ ] Better error handling
- [ ] Maybe add request rate limiting

---

## Design Notes & Tradeoffs

### 1. Stubbed vs. Real LLM Integration

**Decision**: Started with hardcoded responses instead of integrating Ollama/Hugging Face immediately.

**Rationale**: This approach allows for rapid prototyping and testing of the API structure, logging, and error handling without the complexity of model management. The response randomization provides enough variety to simulate real behavior during development.

**Tradeoff**: Less impressive demo but much faster initial development. The modular structure makes swapping in a real LLM straightforward - just replace the response generation logic in `routes/generate.js`.

### 2. Dual Logging Strategy

**Decision**: Separate files for normal operations (`log.jsonl`) and errors (`error.jsonl`) with structured JSON logging.

**Rationale**:

- Operational logs are for analytics/usage tracking
- Error logs are for debugging and monitoring
- JSONL format enables easy parsing and analysis
- Silent failure prevents logging issues from breaking the API

**Tradeoff**: More complex logging setup but much better for production monitoring and debugging. The silent failure approach prioritizes API availability over perfect audit trails.

### 3. Container-First Development

**Decision**: Included Docker from the start rather than adding it later.

**Rationale**: Modern development workflows expect containerization. Having it upfront makes deployment, testing, and distribution much easier. Alpine base keeps the image small and secure.

**Tradeoff**: Slightly more setup complexity but eliminates "works on my machine" issues and makes the project immediately deployable anywhere.

### 4. Express.js & Modular Architecture

**Decision**: Used Express.js with separated route handlers and utility modules rather than a single-file approach or heavier frameworks.

**Rationale**:

- Express provides just enough structure without bloat
- Separated concerns make testing and extending easier
- Router-based organization scales well as endpoints grow
- Lightweight enough for local-first deployment

**Tradeoff**: More files to manage but much better maintainability. Alternative frameworks like FastAPI (Python) or Gin (Go) might offer better performance, but Express.js provides the best balance of familiarity, ecosystem, and rapid development for this use case.
