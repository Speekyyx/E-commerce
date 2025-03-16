--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 16.3 (Ubuntu 16.3-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: doctrine_migration_versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctrine_migration_versions (
    version character varying(191) NOT NULL,
    executed_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    execution_time integer
);


ALTER TABLE public.doctrine_migration_versions OWNER TO postgres;

--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    totalprice double precision NOT NULL,
    creation_date timestamp(0) without time zone NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;

--
-- Name: order_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_product (
    order_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.order_product OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    photo character varying(255) NOT NULL,
    price double precision NOT NULL,
    category character varying(255)
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Data for Name: doctrine_migration_versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctrine_migration_versions (version, executed_at, execution_time) FROM stdin;
DoctrineMigrations\\Version20240416135558	2024-04-16 13:56:23	48
DoctrineMigrations\\Version20240430125349	2024-04-30 12:54:01	28
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, totalprice, creation_date) FROM stdin;
\.


--
-- Data for Name: order_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_product (order_id, product_id) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, photo, price, category) FROM stdin;
1	Example Product	This is an example of a product description.	url_to_photo.jpg	19.99	gpu
2	Thib	This is an example of a product description.	url_to_photo.jpg	19.99	cpu
3	Product 3	This is a description for product 3	url_to_photo.jpg	29.99	cooling
4	Produit 4	Description for product 4	https://example.com/photo4.jpg	24.99	gpu
5	Produit 5	Description for product 5	https://example.com/photo5.jpg	25.99	cpu
6	Produit 6	Description for product 6	https://example.com/photo6.jpg	26.99	cooling
7	Produit 7	Description for product 7	https://example.com/photo7.jpg	27.99	gpu
8	Produit 8	Description for product 8	https://example.com/photo8.jpg	28.99	cpu
9	Produit 9	Description for product 9	https://example.com/photo9.jpg	29.99	cooling
10	Produit 10	Description for product 10	https://example.com/photo10.jpg	30.99	gpu
11	Produit 11	Description for product 11	https://example.com/photo11.jpg	31.99	cpu
12	Produit 12	Description for product 12	https://example.com/photo12.jpg	32.99	cooling
13	Produit 13	Description for product 13	https://example.com/photo13.jpg	33.99	gpu
14	Produit 14	Description for product 14	https://example.com/photo14.jpg	34.99	cpu
15	Produit 15	Description for product 15	https://example.com/photo15.jpg	35.99	cooling
16	Produit 16	Description for product 16	https://example.com/photo16.jpg	36.99	gpu
17	Produit 17	Description for product 17	https://example.com/photo17.jpg	37.99	cpu
18	Produit 18	Description for product 18	https://example.com/photo18.jpg	38.99	cooling
19	Produit 19	Description for product 19	https://example.com/photo19.jpg	39.99	gpu
20	Produit 20	Description for product 20	https://example.com/photo20.jpg	40.99	cpu
21	Produit 21	Description for product 21	https://example.com/photo21.jpg	41.99	cooling
22	Produit 22	Description for product 22	https://example.com/photo22.jpg	42.99	gpu
23	Produit 23	Description for product 23	https://example.com/photo23.jpg	43.99	cpu
24	Produit 24	Description for product 24	https://example.com/photo24.jpg	34.99	motherboard
25	Produit 25	Description for product 25	https://example.com/photo25.jpg	33.99	motherboard
26	Produit 26	Description for product 26	https://example.com/photo26.jpg	32.99	motherboard
27	Produit 27	Description for product 27	https://example.com/photo27.jpg	31.99	motherboard
28	Produit 28	Description for product 28	https://example.com/photo28.jpg	30.99	motherboard
29	Produit 29	Description for product 29	https://example.com/photo29.jpg	29.99	motherboard
30	Produit 30	Description for product 30	https://example.com/photo30.jpg	28.99	motherboard
31	Produit 31	Description for product 31	https://example.com/photo31.jpg	27.99	motherboard
32	Produit 32	Description for product 32	https://example.com/photo32.jpg	26.99	motherboard
33	Produit RAM 1	Description for RAM product 1	https://example.com/photo_ram1.jpg	49.99	ram
34	Produit RAM 2	Description for RAM product 2	https://example.com/photo_ram2.jpg	59.99	ram
35	Produit RAM 3	Description for RAM product 3	https://example.com/photo_ram3.jpg	69.99	ram
36	Produit SSD 1	Description for SSD product 1	https://example.com/photo_ssd1.jpg	99.99	ssd
37	Produit SSD 2	Description for SSD product 2	https://example.com/photo_ssd2.jpg	119.99	ssd
38	Produit SSD 3	Description for SSD product 3	https://example.com/photo_ssd3.jpg	139.99	ssd
39	Produit Cooling 1	Description for Cooling product 1	https://example.com/photo_cooling1.jpg	79.99	cooling
40	Produit Cooling 2	Description for Cooling product 2	https://example.com/photo_cooling2.jpg	89.99	cooling
41	Produit Cooling 3	Description for Cooling product 3	https://example.com/photo_cooling3.jpg	99.99	cooling
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, login, password, email, firstname, lastname) FROM stdin;
3	foobar	$2y$13$CMDrUxg8E4dXSSUfpn.GTOfDiaw4yDeisUjtFX0yh1umXXeIJs8jO	 my@email.com	Foo	Bar
4	thib	$2y$13$K.FaKdDXno2xgf7PhxrvwejIjeZtxr312qSLEMVolW7yBapz4UCcu	 toto@toto.com	u	wu
5	Azerty	$2y$13$zOBBGp8rUertZXQ9pqWGyOf6guF83eeaDEWvxwitZHxZAW.ytqi.S	epitech@gmail.eu	thib	chaumont
16	default_login	$2y$13$KxxuTL0sHJgofz/NZQVfFO0Nkf1FDcZPX.UpPzwwgc3MxAylreM1C	test1@test.com	default_firstname	default_lastname
17	second	$2y$13$nlmVleu5DA9bRA9uU5.39.51hLwzFLXtwxXACEgORi8Zdo8gE4NBa	test1@test.com	test2	tester
19	fourth	$2y$13$MJXCxogG3BcdZQCZRPdtbu3bFf3mnwfnmQml2WlCr4ReTslhhISFe	tester4@test.com	test4	tester
18	third	$2y$13$QA..hOFUjA2QWzoPKiAi/eRkw4p.FdpPYHTaJN5CY2aTCKFzKIwLu	tester3@test.com	test3	tester
\.


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 19, true);


--
-- Name: doctrine_migration_versions doctrine_migration_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctrine_migration_versions
    ADD CONSTRAINT doctrine_migration_versions_pkey PRIMARY KEY (version);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: order_product order_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT order_product_pkey PRIMARY KEY (order_id, product_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: idx_2530ade64584665a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_2530ade64584665a ON public.order_product USING btree (product_id);


--
-- Name: idx_2530ade68d9f6d38; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_2530ade68d9f6d38 ON public.order_product USING btree (order_id);


--
-- Name: order_product fk_2530ade64584665a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fk_2530ade64584665a FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: order_product fk_2530ade68d9f6d38; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT fk_2530ade68d9f6d38 FOREIGN KEY (order_id) REFERENCES public."order"(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

