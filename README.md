# LAPORAN ASN API

Backend API for Laporan ASN Web and Mobile App

## API SPEC

---

### --- AUTH ---

### REGISTER

- Method : `POST`
- Endpoint : `/auth/v1/register`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
- body :

```json
{
  "fullname": "John Doe",
  "nip": "197902102006041002",
  "position": "Staff Kepegawaian",
  "supervisor": "Jane Doe",
  "supervisor_position": "Kepala Bagian Kepegawaian",
  "city": "Palu",
  "password": "password"
}
```

- response :

```json
{
  "message": "Success",
  "code": 201,
  "error": "",
  "data": null
}
```

### LOGIN

- Method : `POST`
- Endpoint : `/auth/v1/login`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
- body :

```json
{
  "nip": "197902102006041002",
  "password": "password"
}
```

- response :

```json
{
  "message": "Success",
  "code": 200,
  "error": "",
  "data": {
    "access_token": "O1ePdqJk5E9KE+H0BuAz54+e5hfcOUkG0xy5qJZ7dKQ=",
    "expired_at": 1642217600,
    "refresh_token": "rh6+nWqsV8g0zeYTwH4NsOvz/5rNoQVUtOg589+HbhY="
  }
}
```

### REFRESH TOKEN

- Method : `POST`
- Endpoint : `/auth/v1/refresh`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
  - Authorization: `Bearer <access_token>`
- body :

```json
{
  "refresh_token": "rh6+nWqsV8g0zeYTwH4NsOvz/5rNoQVUtOg589+HbhY="
}
```

- response :

```json
{
  "message": "Success",
  "code": 200,
  "error": "",
  "data": {
    "access_token": "O1ePdqJk5E9KE+H0BuAz54+e5hfcOUkG0xy5qJZ7dKQ=",
    "expired_at": 86400,
    "refresh_token": "rh6+nWqsV8g0zeYTwH4NsOvz/5rNoQVUtOg589+HbhY="
  }
}
```

### --- Profile ---

### USER PROFILE

- Method : `GET`
- Endpoint : `/api/v1/profile`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
  - Authorization: `Bearer <access_token>`
- response :

```json
{
  "message": "Success",
  "code": 200,
  "error": "",
  "data": {
    "fullname": "John Doe",
    "nip": "197902102006041002",
    "position": "Staff Kepegawaian",
    "supervisor": "Jane Doe",
    "supervisor_position": "Kepala Bagian Keuangan",
    "city": "Palu"
  }
}
```
