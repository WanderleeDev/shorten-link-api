CREATE TABLE `links` (
	`id` varchar(36) NOT NULL,
	`url` varchar(255) NOT NULL,
	`user_id` serial AUTO_INCREMENT,
	`short_Code` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `links_id` PRIMARY KEY(`id`),
	CONSTRAINT `links_id_unique` UNIQUE(`id`),
	CONSTRAINT `links_url_unique` UNIQUE(`url`),
	CONSTRAINT `links_short_Code_unique` UNIQUE(`short_Code`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `hashed_password` varchar(60) NOT NULL;--> statement-breakpoint
ALTER TABLE `links` ADD CONSTRAINT `links_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;