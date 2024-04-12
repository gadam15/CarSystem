-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Kwi 2024, 13:54
-- Wersja serwera: 10.4.22-MariaDB
-- Wersja PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `cardb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cars`
--

CREATE TABLE `cars` (
  `Id` int(11) NOT NULL,
  `Model` longtext NOT NULL,
  `Rok` longtext NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `Marka` longtext NOT NULL,
  `UpdateDate` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  `Licznik` longtext NOT NULL,
  `UserID` int(11) NOT NULL,
  `Opis` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `cars`
--

INSERT INTO `cars` (`Id`, `Model`, `Rok`, `CreateDate`, `Marka`, `UpdateDate`, `Licznik`, `UserID`, `Opis`) VALUES
(1, 'Passat', '2005', '2024-04-05 13:50:09.158170', 'Volkswagen', '2024-04-05 13:50:18.962387', '7', 1, 'Passat passat passat\n:)');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `UserName` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `CreateDate` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  `UpdateDate` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  `PasswordHash` longblob NOT NULL,
  `PasswordSalt` longblob NOT NULL,
  `Role` longtext NOT NULL,
  `TokenCreated` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  `TokenExpired` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000',
  `RefreshToken` longtext DEFAULT NULL,
  `RefreshTokenExpiry` datetime(6) NOT NULL DEFAULT '0001-01-01 00:00:00.000000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`Id`, `UserName`, `Email`, `CreateDate`, `UpdateDate`, `PasswordHash`, `PasswordSalt`, `Role`, `TokenCreated`, `TokenExpired`, `RefreshToken`, `RefreshTokenExpiry`) VALUES
(1, 'passat', 'passat@passat.de', '2024-04-05 13:49:08.265318', '2024-04-05 13:49:08.265364', 0x789afa55565321e3f3ff184374ce0489c5392ecb8bcd08a23acfd743a253a802677ddf4270b93fca545ecaf02e46c042174b427ef0a7bafca7fadb27fa4767ad, 0x285afe7eab292aa019d0f743be355bba58c491b71ff11c845b79d5ba67e774e2dd21b011d00e2a24a6d1b0a7f77c940a09e38a7559f5d24d69f83308a101a9631684e044d14d66ed3477b6651bd5b4d325d2bef4dd6fb2b427fa7cfa77400d03c6905addc0851cbf461f43ce8844310a2c04f86a5e4d231c58be0d0236d81668, 'Admin', '0001-01-01 00:00:00.000000', '0001-01-01 00:00:00.000000', 'zMQ0/bRsa7LtyATS9tct3WS3JvrmIZkzfKdX7ONwEWO37Z2m/iAvFH/zlJ+vGTpayrz7NAAPg4RWhwLl8VHaDQ==', '2024-05-05 13:49:34.270728');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20230929094650_Initial', '7.0.11'),
('20230929104142_Mig', '7.0.11'),
('20231006080140_AddUpdateTimeColumn', '7.0.11'),
('20231006081624_AddUserID_and_LicznikColumns', '7.0.11'),
('20231103085254_add_user_table', '7.0.11'),
('20231103093828_add_collumns_to_table', '7.0.11'),
('20231110095424_changes', '7.0.11'),
('20240119092209_initial2', '7.0.11'),
('20240119164004_b', '7.0.11'),
('20240119171038_addRoleColumn', '7.0.11'),
('20240119200936_migrat', '7.0.11'),
('20240124164220_idk', '7.0.11'),
('20240124173030_idk3', '7.0.11'),
('20240204155506_okok', '7.0.11'),
('20240204180748_UserChanges', '7.0.11'),
('20240329182655_Description', '7.0.11'),
('20240405114632_initial6', '7.0.11');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Cars_UserIDId` (`UserID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- Indeksy dla tabeli `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `cars`
--
ALTER TABLE `cars`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `FK_Cars_Users_UserIDId` FOREIGN KEY (`UserID`) REFERENCES `users` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
