# --- !Ups

ALTER TABLE projects ADD COLUMN source varchar(255);
ALTER TABLE projects ADD COLUMN issues varchar(255);

# --- !Downs

ALTER TABLE projects DROP COLUMN source;
ALTER TABLE projects DROP COLUMN issues;
