USE demo_db;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    email VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email) VALUES
('Juan Perez', 'juan.perez@example.com'),
('Luis Cruz', 'luis.cruz@example.com'),
('Ana Lopez', 'ana.lopez@example.com');