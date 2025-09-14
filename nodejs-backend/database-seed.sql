CREATE TABLE IF NOT EXISTS notes
(
    id serial,
    title text,
    content text, 
    CONSTRAINT notes_pkey PRIMARY KEY (id)
);

INSERT INTO notes(content, title) VALUES
 ('Notes 1 ', 'Example 1 Notes'),
 ('Notes 2', 'Example 2 Notes');


CREATE TABLE IF NOT EXISTS users
(
    user_id serial,
    username text,
    email text,
    user_role text,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT into users (username, email, user_role) VALUES
('root', 'root@randomdomain.com', 'admin'),
('jschlatt','bigguy@randomdomain.com', 'user');
