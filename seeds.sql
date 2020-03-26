USE employeetrackerdb;

INSERT into department (name) VALUES ("PerformingArts");
INSERT into department (name) VALUES ("WebDevelopment");
INSERT into department (name) VALUES ("Education");
INSERT into department (name) VALUES ("Communication");

INSERT into role (title, salary, department_id) VALUES ("Conductor", 40000, 1);
INSERT into role (title, salary, department_id) VALUES ("Vocalist", 30000, 1);
INSERT into role (title, salary, department_id) VALUES ("Instrumentalist", 30000, 1);

INSERT into role (title, salary, department_id) VALUES ("MasterDev", 110000, 2);
INSERT into role (title, salary, department_id) VALUES ("JuniorDev", 60000, 2);
INSERT into role (title, salary, department_id) VALUES ("MidLevelDev", 80000, 2);

INSERT into role (title, salary, department_id) VALUES ("Supervisor", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Principal", 70000, 3);
INSERT into role (title, salary, department_id) VALUES ("Teacher", 45000, 3);

INSERT into role (title, salary, department_id) VALUES ("BusinessManager", 60000, 4);
INSERT into role (title, salary, department_id) VALUES ("AdvertisingExecutive", 50000, 4);
INSERT into role (title, salary, department_id) VALUES ("MediaPlanner", 50000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Leonard", "Bernstein", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Montserrat", "Caballe", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Stephen", "Sondheim", 3, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Loreli", "Boodums", 4, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Horace", "Jenkins", 5, 4);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Levi", "Nilson", 6, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kristie", "Kalhoun", 7, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Trey", "Mitchums", 8, 7);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Gulbi", "Jones", 9, 7);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jason", "Kriggums", 10, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Peter", "Buckle", 11, 10);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Sharon", "Chimmy", 12, 10);