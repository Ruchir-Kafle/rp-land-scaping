CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    number TEXT,
    content TEXT,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
