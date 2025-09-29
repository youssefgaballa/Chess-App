CREATE TABLE IF NOT EXISTS users
(
    user_id serial,
    username text UNIQUE NOT NULL,
    email text UNIQUE,
    firstName text,
    lastName text,
    pwd text NOT NULL,
    user_role text,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

INSERT into users (username, email, firstName, lastName, pwd, user_role) VALUES
('root', 'root@randomdomain.com', 'Root', 'User', '$2b$10$BDdwqWMjNmW0qq6aYwznwuDvf9zpzDHPyRYGr0aSSqOVu7lI31hJC', 'admin'),
('jschlatt','bigguy@randomdomain.com', 'Jschlatt', 'Guy', '$2b$10$IjANtci8587mKmgEp7eB8OiMZzHFv9GbMIe.fjidGf.sJxo5mR2k6', 'user'),
('jgoldberg', 'jgoldberg@randomdomain.com', 'J', 'Goldberg', '$2b$10$edfjfT0vf.1yfEjTX9w70./Jc8gempURz4SMqPsfL6WMsgZmBnzQC', 'editor'),
('gamer', 'gamer@randomdomain.com', 'gamer', 'game', '$2b$10$6eF4EftWRULGoJTdwJroV.IuVYx5n.T59/BgmssYiDN1LKpmT6D7i', 'gamer'),
('bob', 'bob@randomdomain.com', 'Bob', 'Builder', '$2b$10$phXIlRblLuToff58E9vT2ut6OE0tvOUOyj5DRYNBc65mTbyZUA/sW', 'spectator');

CREATE TABLE IF NOT EXISTS notes
(
    id serial,
    title text,
    content text,
    owner_id integer, 
    CONSTRAINT notes_pkey PRIMARY KEY (id),
    CONSTRAINT fk_owner FOREIGN KEY(owner_id) REFERENCES users(user_id) ON DELETE SET NULL
);

INSERT INTO notes(content, title, owner_id) VALUES
 ('root Notes 1 ', 'Example 1 Notes', 1),
 ('root Notes 2 ', 'Example 2 Notes', 1),
 ('root Notes 3 ', 'Example 3 Notes', 1),
 ('jschlatt Notes 1', 'Example 1 Notes', 2),
 ('jschlatt Notes 2', 'Example 2 Notes', 2),
 ('jgoldberg Notes 1', 'Example 1 Notes', 3),
 ('gamer Notes 1', 'Example 1 Notes', 4),
 ('bob Notes 1', 'Example 1 Notes', 5);

CREATE TABLE IF NOT EXISTS chat_rooms
(
    room_id serial,
    owner_username text UNIQUE,
    users text[],
    CONSTRAINT chat_rooms_pkey PRIMARY KEY (room_id)--,
  --  CONSTRAINT fk_owner_username FOREIGN KEY(owner_username) REFERENCES users(username) ON DELETE CASCADE
  -- Uncomment above if you want to enforce foreign key constraint on owner_username and disallow guest users
);

CREATE TABLE IF NOT EXISTS messages
(
    message_id serial,
    room_id integer,
    sender_username text,
    content text,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT messages_pkey PRIMARY KEY (message_id),
    CONSTRAINT fk_room FOREIGN KEY(room_id) REFERENCES chat_rooms(room_id) ON DELETE CASCADE
    -- CONSTRAINT fk_sender FOREIGN KEY(sender_username) REFERENCES users(username) ON DELETE SET NULL
    -- Uncomment above if you want to enforce foreign key constraint on sender_username and disallow guest users
);