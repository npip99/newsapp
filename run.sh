#!/bin/bash
cd backend
. .venv/bin/activate
uvicorn api:app --port 80 --reload
