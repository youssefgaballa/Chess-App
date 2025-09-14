CREATE TABLE IF NOT EXISTS notes
(
    id serial,
    title text UNIQUE,
    content text, 
    CONSTRAINT notes_pkey PRIMARY KEY (id)
);

INSERT INTO notes(content, title) VALUES
 ('Notes 1 ', 'Example 1 Notes'),
 ('Notes 2', 'Example 2 Notes');


CREATE TABLE IF NOT EXISTS users
(
    user_id serial,
    username text UNIQUE,
    email text UNIQUE,
    pwd text,
    user_role text,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT into users (username, email, pwd, user_role) VALUES
('root', 'root@randomdomain.com', '$2b$10$BDdwqWMjNmW0qq6aYwznwuDvf9zpzDHPyRYGr0aSSqOVu7lI31hJC', 'admin'),
('jschlatt','bigguy@randomdomain.com', '$2b$10$IjANtci8587mKmgEp7eB8OiMZzHFv9GbMIe.fjidGf.sJxo5mR2k6', 'user');
