CREATE TABLE "doctors" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"writing_tone" varchar(255) DEFAULT '' NOT NULL
);
