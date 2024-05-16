#!/bin/bash
cd backend
. .venv/bin/activate
uvicorn api:app --host 0.0.0.0 --port 80 --reload
