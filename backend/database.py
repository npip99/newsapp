import sqlite3
from uuid import UUID
import os
from typing import Optional

DATABASE_PATH = "data"

os.makedirs(DATABASE_PATH, exist_ok=True)

DATABASE_NAME = f"{DATABASE_PATH}/app.db"

def init_db():
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS opinions (
        user_id TEXT,
        article_id TEXT,
        topic_id TEXT,
        opinion TEXT,
        PRIMARY KEY (user_id, article_id, topic_id),
        FOREIGN KEY(article_id) REFERENCES articles(id)
    )
    """)
    cursor.execute("INSERT OR REPLACE INTO articles (id) VALUES (?)", ("israelpalestine",))
    conn.commit()
    conn.close()

def record_opinion(user_id: str, article_id: UUID, topic_id: str, opinion: Optional[str]):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()
    if opinion is None:
        cursor.execute("""
        DELETE FROM opinions WHERE user_id = ? AND article_id = ? AND topic_id = ?
        """, (user_id, str(article_id), topic_id))
    else:
        cursor.execute("""
        INSERT OR REPLACE INTO opinions (user_id, article_id, topic_id, opinion)
        VALUES (?, ?, ?, ?)
        """, (user_id, str(article_id), topic_id, opinion))
    conn.commit()
    conn.close()
