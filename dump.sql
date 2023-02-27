PGDMP         4    	            {            shortly    13.10    13.10     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    shortly    DATABASE     g   CREATE DATABASE shortly WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE shortly;
                postgres    false            �            1259    16433    sessions    TABLE     �   CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    16431    sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    205            �           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    204            �            1259    16411    urls    TABLE     �   CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url text NOT NULL,
    short_url text NOT NULL,
    visit_count integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.urls;
       public         heap    postgres    false            �            1259    16409    urls_id_seq    SEQUENCE     �   CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.urls_id_seq;
       public          postgres    false    203            �           0    0    urls_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;
          public          postgres    false    202            �            1259    16397    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16395    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            6           2604    16436    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            3           2604    16414    urls id    DEFAULT     b   ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);
 6   ALTER TABLE public.urls ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            1           2604    16400    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    16433    sessions 
   TABLE DATA                 public          postgres    false    205   Z        �          0    16411    urls 
   TABLE DATA                 public          postgres    false    203   @!       �          0    16397    users 
   TABLE DATA                 public          postgres    false    201   "       �           0    0    sessions_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.sessions_id_seq', 1, true);
          public          postgres    false    204            �           0    0    urls_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.urls_id_seq', 2, true);
          public          postgres    false    202            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    200            C           2606    16442    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    205            E           2606    16444    sessions sessions_token_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);
 E   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_token_key;
       public            postgres    false    205            =           2606    16421    urls urls_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_pkey;
       public            postgres    false    203            ?           2606    16425    urls urls_short_url_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_short_url_key UNIQUE (short_url);
 A   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_short_url_key;
       public            postgres    false    203            A           2606    16423    urls urls_url_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);
 ;   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_url_key;
       public            postgres    false    203            9           2606    16408    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    201            ;           2606    16406    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            G           2606    16445    sessions sessions_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_user_id_fkey;
       public          postgres    false    201    2875    205            F           2606    16426    urls urls_user_id_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 @   ALTER TABLE ONLY public.urls DROP CONSTRAINT urls_user_id_fkey;
       public          postgres    false    201    203    2875            �   �   x���n�@ �<�����T	z2F��Ȫ��XW�аԅy���L&��u#���m���k�1JW���A�.e���g���)�F�Ҭ��r{Zш8Ȗ��3j�8�@�U4+�AY'�U�CT_�~U���P���xم}I�W��#R�m��4���7���## 	��]�޿��v�S6�tB=��9�������1{��,��E�      �   �   x��λ��@���8��#�A�ڂ��qoQ��DHfw�\�}�[m��K��}�;@�=|A�K�Jꍲ0i+��F<�Ql�������	���# M}su%nn
���c��IL��:���}�ӻҥ�R��qa��^E�g�F�fΐC���b�	�dN�A�%>+�V���#,ܨ��\�C�_11��"g�����c?      �   �  x����r�@�O��H����f38A/D�l�h.r��R3���՛�g���ڎ�~S�u����֬��C�_��8к>U�g9M�*F���#ت�Fs� .�U��\7���G��96�0z�mxyζ���W2kWui�g��Fi�����c�4ϴ�o�ܿ�_�����O?a	@e$���x�( ��7�wU1���e7���u�j��'�o��	��b���֦A����$����R �
W�͎��-e8�/��R���@ی�@*W��o7c村Z�\�d�E,.-32�`W�2�Lo�E���t�e�y�g�DxB$���2Įj_��F��I��؁^�f�f�%��oI4^�Te2ѓrW�2�j�s_9? ��+�{���} 8���     