import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")]

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
app = FastAPI(title="API Alumnos")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/alumnos")
def listar_alumnos():
    try:
        res = (
            supabase.table("alumnos")
            .select("id, matricula, nombre")
            .order("matricula")
            .execute()
        )
        return res.data
    except Exception as e:
        print("ERROR SUPABASE:", repr(e))
        raise HTTPException(status_code=500, detail="Error consultando la base de datos")