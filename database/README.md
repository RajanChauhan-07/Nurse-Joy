# Nurse Joy Database

Database schemas, migration scripts, and seed fixtures for the Nurse Joy Hospital Records Management System.

## Files

- **`schema.sql`**: Table definitions for `doctors` and `patients` with constraint validations and search indexes.
- **`seed.sql`**: Initial sample records matching the frontend physician roster and admitted patient directory.

## Getting Started

### Using PostgreSQL

```bash
# 1. Create database
createdb nurse_joy

# 2. Run schema
psql -d nurse_joy -f schema.sql

# 3. Seed initial records
psql -d nurse_joy -f seed.sql
```

### Using SQLite

```bash
sqlite3 nurse_joy.db < schema.sql
sqlite3 nurse_joy.db < seed.sql
```

### Connecting to Backend

Set your `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nurse_joy
```
