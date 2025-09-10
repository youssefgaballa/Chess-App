CREATE TABLE notes
(
    id serial,
    content text, 
    title text,
    CONSTRAINT notes_pkey PRIMARY KEY (id)
);

INSERT INTO notes(content, title) VALUES
 ('Notes 1 ', 'Example 1 Notes'),
 ('Notes 2', 'Example 2 Notes');
