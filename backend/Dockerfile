FROM python:3.10-slim

WORKDIR /authservice

RUN python -m venv /opt/venv

RUN /opt/venv/bin/pip install --upgrade pip

COPY ../requirements.txt .

COPY ../.env /authservice/.env

RUN /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

COPY ./backend .authservice

ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "localhost:8000"]
