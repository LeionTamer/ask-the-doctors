CREATE TABLE "doctors" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "doctors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(50) NOT NULL,
	"email" varchar(100) NOT NULL,
	"writing_tone" varchar(255) DEFAULT '' NOT NULL,
	CONSTRAINT "doctors_email_unique" UNIQUE("email")
);
