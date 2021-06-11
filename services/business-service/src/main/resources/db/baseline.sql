drop table social.bookings;
create table social.bookings(
	id UUID, 
	booking_group_id varchar,
	functionality_id varchar, 
	start_booking TIMESTAMPTZ,
	end_booking TIMESTAMPTZ,
    name varchar,
	length numeric,
	price numeric, 
	symbol varchar, 
	status varchar, 
	user_id varchar, 
	user_email varchar, 
	user_name varchar, 
	address varchar, 
	phone varchar, 
	email varchar,
	web varchar,
	further_contact varchar
);

insert into booking.users(user_id, email, password, email_verified, name, provider) values('fe5e9650-769b-4b0d-a29a-fba3bf0f3091', 'gabor.fekete85@gmail.com', '$2a$10$QGUF3/lWcwOZbVCq5AfEc.uXSyy6qtDBRGVTjd5LYCQ5fKw1TQ4Du', true, 'Gabor Fekete','local');

insert into booking.roles(id, name) values( 2, 'ROLE_MODERATOR');
insert into booking.roles(id, name) values( 1, 'ROLE_ADMIN');
insert into booking.roles(id, name) values( 3, 'ROLE_USER');

insert into booking.user_roles(user_id, role_id) values('fe5e9650-769b-4b0d-a29a-fba3bf0f3091', 1);
insert into booking.user_roles(user_id, role_id) values('fe5e9650-769b-4b0d-a29a-fba3bf0f3091', 2);
insert into booking.user_roles(user_id, role_id) values('fe5e9650-769b-4b0d-a29a-fba3bf0f3091', 3);