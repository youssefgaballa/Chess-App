CREATE TABLE IF NOT EXISTS users
(
    user_id serial,
    username text UNIQUE NOT NULL,
    email text UNIQUE,
    pwd text NOT NULL,
    refresh_token text,
    valid_util timestamp,
    user_role text,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT into users (username, email, pwd, user_role) VALUES
('root', 'root@randomdomain.com', '$2b$10$BDdwqWMjNmW0qq6aYwznwuDvf9zpzDHPyRYGr0aSSqOVu7lI31hJC', 'admin'),
('jschlatt','bigguy@randomdomain.com', '$2b$10$IjANtci8587mKmgEp7eB8OiMZzHFv9GbMIe.fjidGf.sJxo5mR2k6', 'user'),
('jgoldberg', 'jgoldberg@randomdomain.com', '$2b$10$edfjfT0vf.1yfEjTX9w70./Jc8gempURz4SMqPsfL6WMsgZmBnzQC', 'editor'),
('bob', 'bob@randomdomain.com', '$2b$10$phXIlRblLuToff58E9vT2ut6OE0tvOUOyj5DRYNBc65mTbyZUA/sW', 'spectator');

CREATE TABLE IF NOT EXISTS notes
(
    id serial,
    title text UNIQUE,
    content text,
    owner_id integer, 
    CONSTRAINT notes_pkey PRIMARY KEY (id),
    CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES users(user_id) ON DELETE SET NULL
);

INSERT INTO notes(content, title, owner_id) VALUES
 ('Notes 1 ', 'Example 1 Notes', 1),
 ('Notes 2', 'Example 2 Notes', 2);
