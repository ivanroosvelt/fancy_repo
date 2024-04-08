# Backend Good Square Finder

## Features

Receives an n x n matrix, and finds out good squares inside it.
(Good square is an full 1 square starting by unity to n dimention)

---

### Curl Examples

Example 1

```bash
curl -X POST https://4pm7ogojhj.execute-api.us-east-1.amazonaws.com/process -H "Content-Type: application/json" -d "[[1,1,1],[1,1,1],[1,1,1]]"
```

Example 2

```bash
curl -X POST https://4pm7ogojhj.execute-api.us-east-1.amazonaws.com/process -H "Content-Type: application/json" -d "[[1,1,1],[1,0,1],[1,1,1]]"
```

Example 3

```bash
curl -X POST https://4pm7ogojhj.execute-api.us-east-1.amazonaws.com/process -H "Content-Type: application/json" -d "[[1,1,1],[1,1,1],[1,1,0]]"
```

### Endpoint

```
https://4pm7ogojhj.execute-api.us-east-1.amazonaws.com/process
```

### Request

Method: POST

Body: JSON

```json
[
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1]
]
```

(Or any 0 and 1's matrix)

### Response

```json
{
  "total": 30,
  // Summary of [size, quantity]
  "summary": [
    [1, 16],
    [2, 9],
    [3, 4],
    [4, 1]
  ]
}
```

---

### Response Errors

| Name                | Reason                                                    |
| ------------------- | --------------------------------------------------------- |
| No matrix provided  | No Matrix JSON provided                                   |
| Invalid matrix      | Invalid matrix, must contains at least 1x1                |
| Invalid matrix size | Invalid matrix, must be square matrix                     |
| Invalid character   | Invalid matrix, must be , must be only 0's and 1's matrix |
