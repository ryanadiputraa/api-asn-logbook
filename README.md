# LAPORAN ASN API

Backend API for Laporan ASN Web and Mobile App

## API SPEC

---

### --- AUTH ---

### REGISTER

- Method : `POST`
- Endpoint : `/v1/auth/register`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
- body :

```json
{
  "fullname": "String",
  "nip": "String",
  "position": "String",
  "supervisor": "String",
  "supervisor_position": "String",
  "city": "String",
  "password": "String"
}
```

- response :

```json
{
  "status": "Success",
  "code": 201,
  "error": "",
  "data": null
}
```

### LOGIN

- Method : `POST`
- Endpoint : `/v1/auth/login`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
- body :

```json
{
  "nip": "String",
  "password": "String"
}
```

- response :

```json
{
  "status": "Success",
  "code": 200,
  "error": "",
  "data": {
      "access_token": "String",
      "expired_at": Number,
      "refresh_token": "String"
  }
}
```

### --- Profile ---

### USER PROFILE

- Method : `GET`
- Endpoint : `/v1/api/profile`
- Header :
  - Content-Type : `application/json`
  - Accept : `application/json`
- response :

```json
{
  "status": "Success",
  "code": 200,
  "error": "",
  "data": {
    "fullname": "String",
    "nip": "String",
    "position": "String",
    "supervisor": "String",
    "supervisor_position": "String",
    "city": "String"
  }
}
```
