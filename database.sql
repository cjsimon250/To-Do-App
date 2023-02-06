CREATE TABLE "to_do_table" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(200) NOT NULL,
    "completed" BOOLEAN,
    "timeCreated" VARCHAR(25) NOT NULL,
    "color1" INTEGER,
    "color2" INTEGER,
    "color3" INTEGER
)