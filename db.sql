-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 31 Tem 2023, 00:23:52
-- Sunucu sürümü: 5.6.51-cll-lve
-- PHP Sürümü: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `prefix_chatbotlog`
--

CREATE TABLE `prefix_chatbotlog` (
  `id` int(11) NOT NULL,
  `cookie_id` varchar(255) NOT NULL,
  `user_message` varchar(500) DEFAULT NULL,
  `system_answer` varchar(500) DEFAULT NULL,
  `chat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `prefix_chatbotlog`
--

INSERT INTO `prefix_chatbotlog` (`id`, `cookie_id`, `user_message`, `system_answer`, `chat_time`) VALUES
(1, 'chat_64c0d2e3d3a373.91933354', 'Lorem ipsum', 'Lorem ipsum', '2023-07-26 08:01:50');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `prefix_chatbotlog`
--
ALTER TABLE `prefix_chatbotlog`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `prefix_chatbotlog`
--
ALTER TABLE `prefix_chatbotlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
