-- phpMyAdmin SQL Dump
-- version 4.1.13
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Апр 23 2015 г., 00:24
-- Версия сервера: 5.1.36
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `nodejs_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `spPlanned` int(11) DEFAULT NULL,
  `spDone` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `calendar`
--

CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `hours` int(1) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=510 ;

--
-- Дамп данных таблицы `calendar`
--

INSERT INTO `calendar` (`id`, `uid`, `type`, `hours`, `date`) VALUES
(144, 233, 'Vacation', 0, '2015-01-09'),
(143, 233, 'Vacation', 0, '2015-01-08'),
(142, 233, 'Vacation', 0, '2015-01-06'),
(141, 233, 'Vacation', 0, '2015-01-05'),
(140, 233, 'Vacation', 0, '2015-01-02'),
(139, 233, 'Vacation', 0, '2014-12-31'),
(138, 233, 'Vacation', 0, '2014-12-30'),
(137, 233, 'Vacation', 0, '2014-12-29'),
(136, 230, 'Leave', 0, '2014-12-19'),
(135, 187, 'Leave', 0, '2014-12-19'),
(166, 230, 'Holiday', 0, '2015-01-01'),
(165, 229, 'Holiday', 0, '2015-01-01'),
(164, 228, 'Holiday', 0, '2015-01-01'),
(163, 227, 'Holiday', 0, '2015-01-01'),
(158, 6, 'Holiday', 0, '2015-01-01'),
(159, 187, 'Holiday', 0, '2015-01-01'),
(160, 224, 'Holiday', 0, '2015-01-01'),
(161, 225, 'Holiday', 0, '2015-01-01'),
(277, 226, 'Holiday', 0, '2015-01-01'),
(157, 5, 'Holiday', 0, '2015-01-01'),
(133, 225, 'Leave', 0, '2014-12-18'),
(134, 225, 'Leave', 0, '2014-12-19'),
(104, 225, 'Leave', 0, '2014-12-17'),
(179, 224, 'Holiday', 0, '2015-01-07'),
(178, 187, 'Holiday', 0, '2015-01-07'),
(177, 6, 'Holiday', 0, '2015-01-07'),
(176, 5, 'Holiday', 0, '2015-01-07'),
(175, 239, 'Holiday', 0, '2015-01-01'),
(167, 231, 'Holiday', 0, '2015-01-01'),
(174, 238, 'Holiday', 0, '2015-01-01'),
(173, 237, 'Holiday', 0, '2015-01-01'),
(172, 236, 'Holiday', 0, '2015-01-01'),
(171, 235, 'Holiday', 0, '2015-01-01'),
(170, 234, 'Holiday', 0, '2015-01-01'),
(168, 232, 'Holiday', 0, '2015-01-01'),
(169, 233, 'Holiday', 0, '2015-01-01'),
(145, 231, 'Vacation', 0, '2014-12-29'),
(146, 231, 'Vacation', 0, '2014-12-30'),
(147, 231, 'Vacation', 0, '2014-12-31'),
(148, 226, 'Vacation', 0, '2014-12-31'),
(149, 226, 'Vacation', 0, '2015-01-02'),
(150, 5, 'Leave', 0, '2014-12-31'),
(151, 5, 'Leave', 0, '2015-01-02'),
(152, 5, 'Leave', 0, '2014-12-22'),
(153, 226, 'Leave', 0, '2015-01-05'),
(154, 226, 'Leave', 0, '2015-01-06'),
(155, 224, 'Leave', 0, '2015-01-02'),
(156, 229, 'Vacation', 0, '2015-01-02'),
(180, 225, 'Holiday', 0, '2015-01-07'),
(181, 226, 'Holiday', 0, '2015-01-07'),
(182, 227, 'Holiday', 0, '2015-01-07'),
(183, 228, 'Holiday', 0, '2015-01-07'),
(184, 229, 'Holiday', 0, '2015-01-07'),
(185, 230, 'Holiday', 0, '2015-01-07'),
(186, 231, 'Holiday', 0, '2015-01-07'),
(187, 232, 'Holiday', 0, '2015-01-07'),
(188, 233, 'Holiday', 0, '2015-01-07'),
(189, 234, 'Holiday', 0, '2015-01-07'),
(190, 235, 'Holiday', 0, '2015-01-07'),
(191, 236, 'Holiday', 0, '2015-01-07'),
(192, 237, 'Holiday', 0, '2015-01-07'),
(193, 238, 'Holiday', 0, '2015-01-07'),
(194, 239, 'Holiday', 0, '2015-01-07'),
(195, 235, 'Vacation', 0, '2015-01-02'),
(196, 235, 'Vacation', 0, '2014-12-29'),
(197, 235, 'Vacation', 0, '2014-12-30'),
(198, 235, 'Vacation', 0, '2014-12-31'),
(199, 227, 'Vacation', 0, '2015-01-02'),
(278, 233, 'Leave', 0, '2015-01-30'),
(201, 187, 'Vacation', 0, '2014-12-31'),
(202, 187, 'Vacation', 0, '2015-01-02'),
(203, 187, 'Vacation', 0, '2015-01-05'),
(204, 187, 'Vacation', 0, '2015-01-06'),
(205, 187, 'Vacation', 0, '2015-01-08'),
(206, 187, 'Vacation', 0, '2015-01-09'),
(207, 230, 'Vacation', 0, '2014-12-31'),
(208, 230, 'Vacation', 0, '2015-01-02'),
(209, 6, 'Vacation', 0, '2014-12-29'),
(210, 6, 'Vacation', 0, '2014-12-30'),
(211, 6, 'Vacation', 0, '2014-12-31'),
(212, 6, 'Vacation', 0, '2015-01-02'),
(213, 6, 'Vacation', 0, '2015-01-05'),
(214, 6, 'Vacation', 0, '2015-01-06'),
(215, 6, 'Vacation', 0, '2015-01-08'),
(216, 6, 'Vacation', 0, '2015-01-09'),
(217, 226, 'Leave', 0, '2014-12-23'),
(218, 227, 'Vacation', 0, '2014-12-31'),
(219, 227, 'Vacation', 0, '2015-01-05'),
(220, 227, 'Vacation', 0, '2015-01-06'),
(221, 5, 'Leave', 0, '2014-12-23'),
(222, 231, 'Vacation', 0, '2015-01-02'),
(223, 187, 'Vacation', 0, '2014-12-29'),
(224, 187, 'Vacation', 0, '2014-12-30'),
(225, 239, 'Vacation', 0, '2014-12-31'),
(226, 239, 'Vacation', 0, '2015-01-02'),
(227, 236, 'Vacation', 0, '2015-01-02'),
(228, 237, 'Vacation', 0, '2015-01-02'),
(229, 237, 'Vacation', 0, '2014-12-26'),
(230, 225, 'Leave', 0, '2014-12-08'),
(231, 234, 'Half-Day Leave', 0, '2014-12-26'),
(232, 234, 'Leave', 0, '2014-12-12'),
(233, 228, 'Leave', 0, '2014-12-11'),
(234, 228, 'Leave', 0, '2014-12-12'),
(506, 225, 'Leave', 0, '2015-03-06'),
(498, 5, 'Leave', 0, '2015-04-14'),
(237, 228, 'Leave', 0, '2014-11-06'),
(238, 228, 'Leave', 0, '2014-11-07'),
(239, 228, 'Leave', 0, '2014-10-30'),
(240, 228, 'Leave', 0, '2014-09-19'),
(241, 228, 'Leave', 0, '2014-10-03'),
(242, 231, 'Vacation', 0, '2015-01-05'),
(243, 233, 'Leave', 0, '2014-12-04'),
(244, 233, 'Leave', 0, '2014-12-05'),
(245, 234, 'Leave', 0, '2014-12-08'),
(246, 234, 'Leave', 0, '2014-12-09'),
(247, 231, 'Leave', 0, '2014-12-23'),
(248, 226, 'Leave', 0, '2015-01-12'),
(249, 229, 'Leave', 0, '2014-12-31'),
(250, 229, 'Leave', 0, '2015-01-09'),
(251, 5, 'Leave', 0, '2014-12-12'),
(252, 6, 'Leave', 0, '2014-12-01'),
(253, 226, 'Leave', 0, '2015-01-13'),
(254, 230, 'Leave', 0, '2015-01-13'),
(255, 6, 'Leave', 0, '2015-01-14'),
(256, 230, 'Leave', 0, '2015-01-14'),
(257, 6, 'Leave', 0, '2015-01-15'),
(258, 6, 'Leave', 0, '2015-01-16'),
(259, 234, 'Leave', 0, '2015-01-19'),
(260, 224, 'Leave', 0, '2015-01-16'),
(261, 5, 'Leave', 0, '2015-01-27'),
(262, 5, 'Half-Day Leave', 0, '2015-02-02'),
(263, 230, 'Vacation', 0, '2015-02-16'),
(264, 230, 'Vacation', 0, '2015-02-17'),
(265, 230, 'Vacation', 0, '2015-02-18'),
(266, 230, 'Vacation', 0, '2015-02-19'),
(267, 230, 'Vacation', 0, '2015-02-20'),
(268, 225, 'Leave', 0, '2015-01-02'),
(269, 225, 'Leave', 0, '2015-01-23'),
(270, 234, 'Leave', 0, '2015-01-20'),
(271, 234, 'Leave', 0, '2015-01-21'),
(272, 234, 'Leave', 0, '2015-01-22'),
(273, 234, 'Leave', 0, '2015-01-23'),
(274, 232, 'Leave', 0, '2015-01-28'),
(275, 232, 'Leave', 0, '2015-01-29'),
(276, 232, 'Leave', 0, '2015-01-30'),
(279, 230, 'Leave', 0, '2015-01-15'),
(280, 230, 'Leave', 0, '2015-01-16'),
(281, 187, 'Leave', 0, '2015-01-28'),
(282, 187, 'Leave', 0, '2015-01-29'),
(283, 225, 'Leave', 0, '2015-01-30'),
(284, 229, 'Half-Day Leave', 0, '2015-01-14'),
(285, 224, 'Half-Day Leave', 0, '0000-00-00'),
(286, 187, 'Leave', 0, '2015-02-06'),
(287, 229, 'Leave', 0, '2015-02-12'),
(288, 229, 'Leave', 0, '2015-02-11'),
(289, 226, 'Half-Day Leave', 0, '2015-02-06'),
(290, 233, 'Leave', 0, '2015-02-13'),
(291, 5, 'Half-Day Leave', 0, '2015-02-11'),
(292, 187, 'Leave(NA)', 0, '2015-02-18'),
(293, 187, 'Leave(NA)', 0, '2015-02-19'),
(294, 187, 'Leave(NA)', 0, '2015-02-20'),
(295, 6, 'Half-Day Leave', 0, '0000-00-00'),
(299, 233, 'Leave', 0, '2015-02-16'),
(300, 231, 'Leave', 0, '2015-02-23'),
(301, 231, 'Leave', 0, '2015-02-24'),
(497, 224, 'Half-Day Leave', 0, '2015-04-09'),
(303, 6, 'Leave', 0, '2015-02-06'),
(304, 231, 'Vacation', 0, '2015-04-06'),
(305, 231, 'Vacation', 0, '2015-04-07'),
(306, 231, 'Vacation', 0, '2015-04-08'),
(307, 231, 'Vacation', 0, '2015-04-09'),
(308, 231, 'Vacation', 0, '2015-04-10'),
(309, 231, 'Vacation', 0, '2015-04-13'),
(310, 231, 'Vacation', 0, '2015-04-14'),
(311, 231, 'Vacation', 0, '2015-04-15'),
(312, 231, 'Vacation', 0, '2015-04-16'),
(313, 231, 'Vacation', 0, '2015-04-17'),
(314, 234, 'Leave', 0, '2015-02-25'),
(315, 225, 'Leave', 0, '2015-02-25'),
(316, 6, 'Leave(NA)', 0, '2015-03-02'),
(317, 224, 'Leave', 0, '2015-02-26'),
(318, 225, 'Leave', 0, '2015-02-26'),
(319, 229, 'Half-Day Leave', 0, '2015-02-27'),
(320, 226, 'Leave', 0, '2015-03-04'),
(321, 240, 'Leave', 0, '2015-03-04'),
(322, 232, 'Vacation', 0, '2015-03-10'),
(323, 229, 'Leave', 0, '2015-03-05'),
(324, 5, 'Half-Day Leave', 0, '2015-03-05'),
(325, 229, 'Leave', 0, '2015-03-06'),
(326, 5, 'Holiday', 0, '2015-03-09'),
(327, 6, 'Holiday', 0, '2015-03-09'),
(328, 187, 'Holiday', 0, '2015-03-09'),
(329, 224, 'Holiday', 0, '2015-03-09'),
(330, 225, 'Holiday', 0, '2015-03-09'),
(331, 226, 'Holiday', 0, '2015-03-09'),
(332, 227, 'Holiday', 0, '2015-03-09'),
(333, 228, 'Holiday', 0, '2015-03-09'),
(334, 229, 'Holiday', 0, '2015-03-09'),
(335, 230, 'Holiday', 0, '2015-03-09'),
(336, 231, 'Holiday', 0, '2015-03-09'),
(337, 232, 'Holiday', 0, '2015-03-09'),
(338, 233, 'Holiday', 0, '2015-03-09'),
(339, 234, 'Holiday', 0, '2015-03-09'),
(340, 235, 'Holiday', 0, '2015-03-09'),
(341, 236, 'Holiday', 0, '2015-03-09'),
(342, 237, 'Holiday', 0, '2015-03-09'),
(343, 238, 'Holiday', 0, '2015-03-09'),
(344, 239, 'Holiday', 0, '2015-03-09'),
(345, 240, 'Holiday', 0, '2015-03-09'),
(346, 5, 'Leave(NA)', 0, '2015-03-10'),
(347, 229, 'Leave', 0, '2015-03-10'),
(348, 227, 'Vacation', 0, '2015-03-10'),
(349, 5, 'Leave(NA)', 0, '2015-03-11'),
(350, 225, 'Leave', 0, '2015-03-11'),
(351, 240, 'Leave', 0, '2015-02-04'),
(352, 240, 'Leave', 0, '2015-03-13'),
(496, 231, 'Half-Day Leave', 0, '2015-03-26'),
(495, 232, 'Leave', 0, '2015-04-09'),
(355, 228, 'Half-Day Leave', 0, '2015-03-16'),
(356, 229, 'Leave', 0, '2015-02-13'),
(357, 5, 'Half-Day Leave', 0, '2015-03-18'),
(358, 225, 'Leave', 0, '2015-03-20'),
(359, 228, 'Leave', 0, '2015-03-20'),
(360, 187, 'Leave(NA)', 0, '2015-03-20'),
(361, 6, 'Leave(NA)', 0, '2015-03-20'),
(362, 230, 'Leave', 0, '2015-03-20'),
(363, 233, 'Half-Day Leave', 0, '2015-03-19'),
(369, 233, 'Leave', 0, '2015-04-01'),
(364, 6, 'Leave(NA)', 0, '2015-03-23'),
(365, 240, 'Leave', 0, '2015-03-23'),
(366, 229, 'Leave(NA)', 0, '2015-03-27'),
(367, 224, 'Leave', 0, '2015-03-27'),
(368, 233, 'Leave', 0, '2015-03-30'),
(370, 226, 'Half-Day Leave', 0, '2015-03-27'),
(494, 228, 'Leave', 0, '2015-02-05'),
(372, 5, 'Leave', 0, '2015-04-03'),
(373, 225, 'Leave', 0, '2015-04-03'),
(374, 229, 'Leave(NA)', 0, '2015-04-03'),
(375, 228, 'Half-Day Leave(NA)', 0, '2014-12-01'),
(376, 228, 'Half-Day Leave', 0, '2014-12-31'),
(377, 228, 'Half-Day Leave(NA)', 0, '2014-12-15'),
(499, 229, 'Leave(NA)', 0, '2015-04-15'),
(493, 228, 'Leave', 0, '2015-01-02'),
(379, 187, 'Leave(NA)', 0, '2015-04-06'),
(380, 187, 'Leave(NA)', 0, '2015-04-10'),
(381, 240, 'Leave', 0, '2015-04-07'),
(382, 230, 'Vacation', 0, '2015-04-30'),
(383, 230, 'Vacation(NA)', 0, '2015-05-01'),
(384, 230, 'Vacation(NA)', 0, '2015-05-04'),
(385, 230, 'Vacation', 0, '2015-05-05'),
(386, 230, 'Vacation', 0, '2015-05-06'),
(387, 230, 'Vacation', 0, '2015-05-07'),
(388, 230, 'Vacation', 0, '2015-05-08'),
(389, 230, 'Vacation(NA)', 0, '2015-05-11'),
(390, 230, 'Vacation', 0, '2015-05-12'),
(391, 5, 'Holiday', 0, '2015-05-01'),
(392, 6, 'Holiday', 0, '2015-05-01'),
(393, 187, 'Holiday', 0, '2015-05-01'),
(394, 224, 'Holiday', 0, '2015-05-01'),
(395, 225, 'Holiday', 0, '2015-05-01'),
(396, 226, 'Holiday', 0, '2015-05-01'),
(397, 227, 'Holiday', 0, '2015-05-01'),
(398, 228, 'Holiday', 0, '2015-05-01'),
(399, 229, 'Holiday', 0, '2015-05-01'),
(400, 230, 'Holiday', 0, '2015-05-01'),
(401, 231, 'Holiday', 0, '2015-05-01'),
(402, 232, 'Holiday', 0, '2015-05-01'),
(403, 233, 'Holiday', 0, '2015-05-01'),
(404, 234, 'Holiday', 0, '2015-05-01'),
(405, 235, 'Holiday', 0, '2015-05-01'),
(406, 236, 'Holiday', 0, '2015-05-01'),
(407, 237, 'Holiday', 0, '2015-05-01'),
(408, 238, 'Holiday', 0, '2015-05-01'),
(409, 239, 'Holiday', 0, '2015-05-01'),
(410, 240, 'Holiday', 0, '2015-05-01'),
(411, 241, 'Holiday', 0, '2015-05-01'),
(412, 5, 'Holiday', 0, '2015-05-04'),
(413, 6, 'Holiday', 0, '2015-05-04'),
(414, 187, 'Holiday', 0, '2015-05-04'),
(415, 224, 'Holiday', 0, '2015-05-04'),
(416, 225, 'Holiday', 0, '2015-05-04'),
(417, 226, 'Holiday', 0, '2015-05-04'),
(418, 227, 'Holiday', 0, '2015-05-04'),
(419, 228, 'Holiday', 0, '2015-05-04'),
(420, 229, 'Holiday', 0, '2015-05-04'),
(421, 230, 'Holiday', 0, '2015-05-04'),
(422, 231, 'Holiday', 0, '2015-05-04'),
(423, 232, 'Holiday', 0, '2015-05-04'),
(424, 233, 'Holiday', 0, '2015-05-04'),
(425, 234, 'Holiday', 0, '2015-05-04'),
(426, 235, 'Holiday', 0, '2015-05-04'),
(427, 236, 'Holiday', 0, '2015-05-04'),
(428, 237, 'Holiday', 0, '2015-05-04'),
(429, 238, 'Holiday', 0, '2015-05-04'),
(430, 239, 'Holiday', 0, '2015-05-04'),
(431, 240, 'Holiday', 0, '2015-05-04'),
(432, 241, 'Holiday', 0, '2015-05-04'),
(433, 5, 'Holiday', 0, '2015-05-11'),
(434, 6, 'Holiday', 0, '2015-05-11'),
(435, 187, 'Holiday', 0, '2015-05-11'),
(436, 224, 'Holiday', 0, '2015-05-11'),
(437, 225, 'Holiday', 0, '2015-05-11'),
(438, 226, 'Holiday', 0, '2015-05-11'),
(439, 227, 'Holiday', 0, '2015-05-11'),
(440, 228, 'Holiday', 0, '2015-05-11'),
(441, 229, 'Holiday', 0, '2015-05-11'),
(442, 230, 'Holiday', 0, '2015-05-11'),
(443, 231, 'Holiday', 0, '2015-05-11'),
(444, 232, 'Holiday', 0, '2015-05-11'),
(445, 233, 'Holiday', 0, '2015-05-11'),
(446, 234, 'Holiday', 0, '2015-05-11'),
(447, 235, 'Holiday', 0, '2015-05-11'),
(448, 236, 'Holiday', 0, '2015-05-11'),
(449, 237, 'Holiday', 0, '2015-05-11'),
(450, 238, 'Holiday', 0, '2015-05-11'),
(451, 239, 'Holiday', 0, '2015-05-11'),
(452, 240, 'Holiday', 0, '2015-05-11'),
(453, 241, 'Holiday', 0, '2015-05-11'),
(454, 234, 'Leave', 0, '2015-04-06'),
(455, 5, 'Holiday', 0, '2015-04-13'),
(456, 6, 'Holiday', 0, '2015-04-13'),
(457, 187, 'Holiday', 0, '2015-04-13'),
(458, 224, 'Holiday', 0, '2015-04-13'),
(459, 225, 'Holiday', 0, '2015-04-13'),
(460, 226, 'Holiday', 0, '2015-04-13'),
(461, 227, 'Holiday', 0, '2015-04-13'),
(462, 228, 'Holiday', 0, '2015-04-13'),
(463, 229, 'Holiday', 0, '2015-04-13'),
(464, 230, 'Holiday', 0, '2015-04-13'),
(465, 231, 'Holiday', 0, '2015-04-13'),
(466, 232, 'Holiday', 0, '2015-04-13'),
(467, 233, 'Holiday', 0, '2015-04-13'),
(468, 234, 'Holiday', 0, '2015-04-13'),
(469, 235, 'Holiday', 0, '2015-04-13'),
(470, 236, 'Holiday', 0, '2015-04-13'),
(471, 237, 'Holiday', 0, '2015-04-13'),
(472, 238, 'Holiday', 0, '2015-04-13'),
(473, 239, 'Holiday', 0, '2015-04-13'),
(474, 240, 'Holiday', 0, '2015-04-13'),
(475, 241, 'Holiday', 0, '2015-04-13'),
(476, 5, 'Vacation', 0, '2015-04-10'),
(477, 233, 'Vacation', 0, '2015-04-10'),
(478, 233, 'Vacation', 0, '2015-04-14'),
(479, 233, 'Vacation', 0, '2015-04-15'),
(480, 233, 'Vacation', 0, '2015-04-16'),
(481, 233, 'Vacation', 0, '2015-04-17'),
(482, 234, 'Leave', 0, '2015-04-14'),
(483, 6, 'Leave(NA)', 0, '2015-04-14'),
(484, 233, 'Half-Day Leave', 0, '2015-04-09'),
(485, 233, 'Half-Day Leave', 0, '2015-03-26'),
(486, 233, 'Leave', 0, '2015-03-31'),
(487, 240, 'Leave', 0, '2015-03-27'),
(488, 241, 'Half-Day Leave', 0, '2015-04-09'),
(489, 228, 'Half-Day Leave', 0, '2014-12-26'),
(490, 228, 'Leave', 0, '2015-01-30'),
(491, 228, 'Half-Day Leave', 0, '2015-02-03'),
(492, 228, 'Half-Day Leave', 0, '2015-03-10'),
(500, 5, 'Half-Day Leave', 0, '2015-04-16'),
(501, 187, 'Half-Day Leave(NA)', 0, '2015-04-20'),
(502, 224, 'Vacation', 0, '2015-05-05'),
(503, 224, 'Vacation', 0, '2015-05-06'),
(504, 224, 'Vacation', 0, '2015-05-07'),
(505, 224, 'Vacation', 0, '2015-05-08'),
(507, 234, 'Vacation', 0, '2015-04-30'),
(508, 234, 'Vacation', 0, '2015-05-05'),
(509, 234, 'Vacation', 0, '2015-05-06');

-- --------------------------------------------------------

--
-- Структура таблицы `capacity`
--

CREATE TABLE IF NOT EXISTS `capacity` (
  `id` int(11) NOT NULL,
  `sid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `wdp` int(11) DEFAULT NULL,
  `wda` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `casetotest`
--

CREATE TABLE IF NOT EXISTS `casetotest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;

--
-- Дамп данных таблицы `casetotest`
--

INSERT INTO `casetotest` (`id`, `tid`, `cid`) VALUES
(1, 1, 10),
(2, 1, 10),
(3, 1, 9),
(4, 1, 1),
(5, 1, 9),
(6, 2, 10),
(7, 3, 9),
(8, 1, 10),
(9, 1, 9),
(10, 1, 10),
(11, 11, 6),
(12, 11, 5),
(13, 1, 10),
(14, 9, 9),
(15, 2, 9),
(16, 9, 10),
(17, 9, 10),
(18, 9, 9),
(19, 9, 10),
(20, 10, 1),
(21, 9, 9),
(22, 9, 9),
(23, 9, 10),
(24, 7, 10),
(25, 5, 9),
(26, 8, 9),
(27, 6, 9),
(28, 4, 9),
(29, 4, 10),
(30, 12, 21),
(31, 13, 21),
(32, 11, 5),
(33, 8, 9),
(34, 8, 9),
(35, 8, 10),
(36, 8, 9),
(37, 8, 10),
(38, 8, 9),
(39, 11, 5),
(40, 11, 6),
(41, 11, 20),
(42, 9, 9),
(43, 7, 9),
(44, 7, 9),
(45, 7, 10),
(46, 7, 9),
(47, 9, 9),
(48, 13, 7),
(49, 13, 22),
(50, 11, 15);

-- --------------------------------------------------------

--
-- Структура таблицы `case_folder`
--

CREATE TABLE IF NOT EXISTS `case_folder` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pid` int(8) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

--
-- Дамп данных таблицы `case_folder`
--

INSERT INTO `case_folder` (`id`, `pid`, `name`) VALUES
(1, 0, 'root'),
(2, 1, 'first'),
(3, 2, 'inFirst'),
(4, 1, 'second'),
(5, 1, 'third'),
(6, 4, 'underSecond'),
(21, 1, 'Folder'),
(20, 1, 'NewFolder'),
(19, 5, 'hey'),
(18, 1, 'delete me'),
(17, 6, 'folder'),
(22, 1, 'Blabla'),
(29, 27, 'test name'),
(28, 2147483647, 'test name'),
(47, 1, 'Folder'),
(33, 32, '2'),
(34, 33, '2'),
(35, 34, '2'),
(38, 37, 'test name'),
(39, 37, 'test name'),
(40, 37, 'test name'),
(42, 41, 'test name'),
(43, 41, 'test name'),
(44, 41, 'test name'),
(46, 45, 'test name');

-- --------------------------------------------------------

--
-- Структура таблицы `case_points`
--

CREATE TABLE IF NOT EXISTS `case_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cfid` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `owner` varchar(15) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `steps` varchar(1000) NOT NULL,
  `expected` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Дамп данных таблицы `case_points`
--

INSERT INTO `case_points` (`id`, `cfid`, `name`, `status`, `owner`, `description`, `steps`, `expected`) VALUES
(1, 3, 'Login', 'Design', 'glkallak', 'The main focus of this test is to verify login functionality.', '1. Launch browser.\r\n2. Open url="google.com"\r\n3. Login using login="notexist" and password="notexist"', '1. Browser launched.\r\n2. Url opened.\r\n3. You are failed to login with message="user not exist"'),
(2, 3, 'test id', 'to-review', '', 'Some notes', 'test steps', 'expected'),
(3, 3, 'bla bla', 'new', '', 'Noetes', 'steps', 'Expected res'),
(4, 6, 'second', 'new', '', 'hvjvjvj', 'steps', 'erytrt'),
(5, 5, 'hgf', 'new', '', 'f', 'jgf', 'jhvg'),
(6, 5, '565656', 'new', '', 'hbyy', 'tytyt', 'ty6g6g'),
(7, 1, 'roooot', 'new', '', 'iggugugu', 'ufufu', 'hccuuvu'),
(8, 2147483647, 'jhgjgh', 'new', '', 'jhjvuv', 'khkhkhj', 'bjbbbb'),
(9, 17, 'kjhkhj', 'new', '', 'kjkh', 'kjhjkh', 'kjkhjk'),
(10, 17, '11111', 'new', '', '44444444', '22222', '33333'),
(11, 18, 'del', 'new', '', 'del notes', 'del', 'del exp'),
(12, 18, 'd2', 'new', '', 'jvucc', 'kggii', 'kbbiv'),
(13, 18, 'yffufufufuu', 'new', '', 'wrthrthrt', 'jufuuf', 'thrwthwrth'),
(14, 2147483647, 'lllllll', 'new', '', '', 'llklk', 'kkkkkk'),
(15, 20, 'some case id', 'new', '', '', 'steps', 'expected'),
(16, 2147483647, 'Case', 'new', '', '', 'Steps', 'Expected'),
(17, 3, 'New case id', 'new', '', '', 'steps', 'expected'),
(18, 18, 'erty', 'new', '', '', 'erty', 'erty'),
(19, 3, 'erf', 'new', '', '', 'erferf', 'erferf'),
(20, 5, 'asdf', 'new', '', '', 'asdf', 'asdf'),
(21, 47, 'TC1', 'new', '', 'wrthrthrt', 'Steps', 'Expected'),
(22, 1, 'werwer', 'new', '', '44444444', 'enter1\nenter2\nenter3\n', 'werwerwerr');

-- --------------------------------------------------------

--
-- Структура таблицы `conf_configtolists`
--

CREATE TABLE IF NOT EXISTS `conf_configtolists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL COMMENT 'config id',
  `ppid` int(11) NOT NULL COMMENT 'position parent id',
  `lid` int(11) NOT NULL COMMENT 'list id',
  `liid` int(11) NOT NULL COMMENT 'list item id',
  `tl` int(11) NOT NULL COMMENT 'top(1) or left(0)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=237 ;

--
-- Дамп данных таблицы `conf_configtolists`
--

INSERT INTO `conf_configtolists` (`id`, `cid`, `ppid`, `lid`, `liid`, `tl`) VALUES
(236, 4, 232, 2, 4, 0),
(235, 4, 232, 2, 3, 0),
(234, 4, 232, 1, 2, 0),
(233, 4, 232, 1, 1, 0),
(232, 4, 0, 3, 5, 0),
(231, 1, 0, 3, 5, 0),
(230, 1, 228, 2, 3, 1),
(229, 1, 227, 2, 3, 1),
(228, 1, 0, 1, 2, 1),
(227, 1, 0, 1, 1, 1),
(226, 5, 222, 2, 4, 1),
(225, 5, 221, 2, 4, 1),
(224, 5, 222, 2, 3, 1),
(223, 5, 221, 2, 3, 1),
(222, 5, 0, 1, 2, 1),
(221, 5, 0, 1, 1, 1),
(220, 3, 210, 2, 3, 0),
(219, 3, 210, 2, 3, 0),
(208, 3, 207, 3, 5, 0),
(207, 3, 0, 1, 1, 0),
(206, 3, 203, 2, 4, 1),
(205, 3, 201, 2, 4, 1),
(204, 3, 203, 2, 3, 1),
(203, 3, 0, 1, 1, 1),
(202, 3, 201, 2, 3, 1),
(201, 3, 0, 1, 1, 1),
(218, 3, 208, 2, 3, 0),
(217, 3, 208, 2, 3, 0),
(216, 4, 212, 2, 4, 1),
(215, 4, 211, 2, 4, 1),
(214, 4, 212, 2, 3, 1),
(213, 4, 211, 2, 3, 1),
(212, 4, 0, 1, 2, 1),
(211, 4, 0, 1, 1, 1),
(210, 3, 209, 3, 5, 0),
(209, 3, 0, 1, 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `conf_configuration`
--

CREATE TABLE IF NOT EXISTS `conf_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `conf_configuration`
--

INSERT INTO `conf_configuration` (`id`, `name`) VALUES
(1, 'Features with Browser'),
(3, 'Configuration 2'),
(4, 'Configuration 3'),
(5, 'Configuration 5');

-- --------------------------------------------------------

--
-- Структура таблицы `conf_left`
--

CREATE TABLE IF NOT EXISTS `conf_left` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `plid` int(11) NOT NULL,
  `lid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `conf_left`
--

INSERT INTO `conf_left` (`id`, `cid`, `plid`, `lid`) VALUES
(1, 1, 0, 3),
(2, 1, 0, 1),
(3, 1, 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `conf_list`
--

CREATE TABLE IF NOT EXISTS `conf_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `conf_list`
--

INSERT INTO `conf_list` (`id`, `name`) VALUES
(1, 'OS'),
(2, 'Browser'),
(3, 'Feature');

-- --------------------------------------------------------

--
-- Структура таблицы `conf_listitems`
--

CREATE TABLE IF NOT EXISTS `conf_listitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `lid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `conf_listitems`
--

INSERT INTO `conf_listitems` (`id`, `name`, `lid`) VALUES
(1, 'Win7', 1),
(2, 'Win8', 1),
(3, 'IE', 2),
(4, 'Safari', 2),
(5, 'Management Console', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `conf_top`
--

CREATE TABLE IF NOT EXISTS `conf_top` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `plid` int(11) NOT NULL,
  `lid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `defect`
--

CREATE TABLE IF NOT EXISTS `defect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `summary` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `sid` int(11) NOT NULL COMMENT 'status id',
  `rid` int(11) NOT NULL COMMENT 'reporter id',
  `did` int(11) NOT NULL COMMENT 'developer id',
  `bdetected` int(11) NOT NULL COMMENT 'build detected',
  `bfixed` int(11) NOT NULL COMMENT 'bfixed',
  `pid` int(11) NOT NULL COMMENT 'priority id',
  `sevid` int(11) NOT NULL COMMENT 'severity id',
  `comments` varchar(2000) NOT NULL,
  `tid` int(11) NOT NULL COMMENT 'type id',
  `fid` int(11) NOT NULL COMMENT 'feature id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=272 ;

--
-- Дамп данных таблицы `defect`
--

INSERT INTO `defect` (`id`, `summary`, `description`, `sid`, `rid`, `did`, `bdetected`, `bfixed`, `pid`, `sevid`, `comments`, `tid`, `fid`) VALUES
(1, 'Nothing happen when you click on "Edit" button in "Users" page.', '1. Open Agile Manager.\r\n2. Click on ''Users'' top menu button.\r\n3. Click on ''Edit'' button of any user. If no user exist please create new user and perform step3.', 1, 187, 187, 100, 0, 3, 3, '', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `defect_severity`
--

CREATE TABLE IF NOT EXISTS `defect_severity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `defect_severity`
--

INSERT INTO `defect_severity` (`id`, `name`) VALUES
(1, 'Minor'),
(2, 'Major'),
(3, 'Critical'),
(4, 'Blocker');

-- --------------------------------------------------------

--
-- Структура таблицы `defect_status`
--

CREATE TABLE IF NOT EXISTS `defect_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `defect_status`
--

INSERT INTO `defect_status` (`id`, `name`) VALUES
(1, 'New'),
(2, 'Open'),
(3, 'Fixed'),
(4, 'Rejected'),
(5, 'Reopen'),
(6, 'Closed');

-- --------------------------------------------------------

--
-- Структура таблицы `defect_type`
--

CREATE TABLE IF NOT EXISTS `defect_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `defect_type`
--

INSERT INTO `defect_type` (`id`, `name`) VALUES
(1, 'Functional'),
(2, 'Performance'),
(3, 'UI'),
(4, 'Usability'),
(5, 'Configuration'),
(6, 'Business Logic'),
(7, 'Integration');

-- --------------------------------------------------------

--
-- Структура таблицы `feature`
--

CREATE TABLE IF NOT EXISTS `feature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `feature`
--

INSERT INTO `feature` (`id`, `name`) VALUES
(1, 'Users'),
(2, 'Calendar'),
(3, 'Teams'),
(4, 'TestLab'),
(5, 'Configurations'),
(6, 'Defects'),
(7, 'Settings'),
(8, 'Profile - Tasks');

-- --------------------------------------------------------

--
-- Структура таблицы `pomodoro_breaks`
--

CREATE TABLE IF NOT EXISTS `pomodoro_breaks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tid` int(11) NOT NULL,
  `reason` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

--
-- Дамп данных таблицы `pomodoro_breaks`
--

INSERT INTO `pomodoro_breaks` (`id`, `tid`, `reason`, `date`, `uid`) VALUES
(35, 97, '', '2015-04-08 13:22:54', 187),
(34, 90, '', '2015-04-07 14:39:41', 224),
(33, 86, '', '2015-03-08 21:57:02', 187),
(32, 84, '', '2015-02-02 16:24:05', 187),
(31, 78, '', '2014-12-23 14:45:47', 187),
(30, 75, '', '2014-12-17 19:25:14', 187),
(29, 74, '', '2014-12-17 19:05:47', 187),
(28, 72, '', '2014-12-17 16:45:22', 187),
(27, 72, '', '2014-12-17 16:23:22', 187),
(26, 71, '', '2014-12-17 15:41:30', 187),
(25, 70, '', '2014-12-17 10:13:03', 187),
(24, 57, '', '2014-12-16 23:24:04', 187);

-- --------------------------------------------------------

--
-- Структура таблицы `pomodoro_tasks`
--

CREATE TABLE IF NOT EXISTS `pomodoro_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `break` varchar(20) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=108 ;

--
-- Дамп данных таблицы `pomodoro_tasks`
--

INSERT INTO `pomodoro_tasks` (`id`, `uid`, `title`, `duration`, `status`, `break`, `date`) VALUES
(8, 221, 'Task for Nataliia', 40, 'New', '', '2014-12-01 00:00:00'),
(43, 41, '', 0, '', '', '2014-12-15 00:00:00'),
(61, 223, 'Log Utility', 1, 'Done', '', '0000-00-00 00:00:00'),
(103, 187, 'Add possibility to change testcases order', 5, 'New', '', '0000-00-00 00:00:00'),
(104, 187, 'Move tasks to separate tab.', 2, 'New', '', '0000-00-00 00:00:00'),
(100, 187, 'Bug: Clear new case creation fields when press on x button.', 1, 'New', '', '0000-00-00 00:00:00'),
(59, 222, 'MDC', 12, 'Break', '', '2014-12-16 00:00:00'),
(105, 187, 'Implement automated email reporting.', 2, 'New', '', '0000-00-00 00:00:00'),
(101, 187, 'Implement stories tab.', 10, 'New', '', '0000-00-00 00:00:00'),
(94, 187, 'Implement d&d tc to test', 1, 'Done', '', '0000-00-00 00:00:00'),
(95, 187, 'Implement tc preview area.', 1, 'New', '', '0000-00-00 00:00:00'),
(96, 187, 'Create different icons for tcs and tests.', 1, 'Done', '', '0000-00-00 00:00:00'),
(99, 187, 'Bug: Textarea fields should be resized automatically on tc load.', 2, 'New', '', '0000-00-00 00:00:00'),
(98, 187, 'Bug: tc id need to be updated with c id. Because I can''t get case by tc id.', 2, 'Done', '', '0000-00-00 00:00:00'),
(91, 224, 'Run Data Integrity 10G', 360, 'Done', '', '2015-04-06 00:00:00'),
(88, 187, 'Delete subfolders on parent folder deletion.', 60, 'New', '', '2015-04-10 00:00:00'),
(92, 187, 'Make impossible folder creation under test case.', 1, 'Done', '', '0000-00-00 00:00:00'),
(93, 187, 'Fix issue when all cases appear on TestLab load.', 1, 'Done', '', '0000-00-00 00:00:00'),
(106, 187, 'Implemen Stories tab.', 10, 'New', '', '0000-00-00 00:00:00'),
(107, 187, 'Implemen different projects functionality.', 10, 'New', '', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `release`
--

CREATE TABLE IF NOT EXISTS `release` (
  `id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `spPlanned` int(11) NOT NULL,
  `spDone` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-UQcamDepxmtNGMBeDG0ldLXnPnlh9q7', 1427910335, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('-zyiL0zeA6jAyQ42sE1fbn6Zoh89WoeB', 1427187144, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('07oydhNkjAb43N_DKyqbLIycF6esQ6Cj', 1425892615, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('0DOWHKtf0TwnZeCeUmpgBMojfyaEHAWp', 1426949023, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('0L3dfc2SMC1S5-c8UUMOeG1gen4KoG4n', 1428151582, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('1s-pxwwVHebSWRHK7KpdBOxDDqhS3kUX', 1428172400, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('2gu3PsUJ-Jn7ZFihlZ59HcEZn_4hKNxh', 1425477998, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('3DYz1NGDA4ZdE-MGZ81A_2IbO8XWns06', 1428159436, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('3PeVyp0SuuA803_MMcUZsYHvplUNZSs3', 1427711800, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('45cunoe0P04-oLRH4kDX3zFlKIO61KNt', 1428160283, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":228,"admin":"N"}'),
('4eFZr5QQHrc6qz9RHfib4KY5zCeQaRyf', 1427716784, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('4fBgQLkp_8o8NypNjATuaAFz0fpV5aGL', 1424943798, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":231,"admin":"N"}'),
('58cchjZ-HMPnI7ZwkNLEwcTwFWMkUOZi', 1427458977, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('5IAN3l_hmJBK_CSx4US1MF_pXq8LorMA', 1426949023, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('7cRdjw7MNfmboZeMdewMpJY0tanGt50L', 1425845720, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('7hSwUeJq1ZcCKa2dOaJ-VqFuqINXXOhF', 1425635386, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('7i0B0CkIRhVEM9KMxue3jW-cl-FxBorB', 1427187144, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('8gySchvpFgvdBFxwmZ3_kzdWL5L1jWyq', 1427369001, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('8zbeZ0zAWKlqtdUeO19V84XFpdtnfCLp', 1424807173, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('9-CfuyLBvQ0VnDVWFP27C3ouuoJir57f', 1427369002, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('94dHy2vFVTjIIH1RSoXs2o5lW8Noht7e', 1427998162, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('A1E0JpdDVyZMjzjNh5Q9uBuYqZa04I-A', 1425625071, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('AA3RoKDEvU9iOVTXgjkSuVaR1M6JoHey', 1427914547, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('AFbPww2U6KUVBnUG4zqyzjW30juWU8l_', 1429363681, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('BJWTqSqBRmAOgdIAdnHlVzjUi5e85QyO', 1425758443, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('BOeWVJOfJBxjVDjMhIK5MbKx_EodpsZ0', 1426090150, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('BOenTp94qgD3OQLKsnJmyToc0msuED2-', 1427369001, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Bdc_zj3IGZF3EMur3w72ZVCAQx_BuFBh', 1427914846, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('D-mPTHNBuWYAWxkyJg5HnOLPCxTrBxpw', 1429706997, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('DEyahV6vDowTEnrq6947uWY2bmbXDEbF', 1426761400, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('DQqaFfyt6kP8-owvtI3HVKP2wSqPjJjQ', 1428091842, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('DfyitVWY6C_oWiy6vF4IC0LaD1Z70Dpf', 1427276763, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('DhynZF9wwwO5N5_ThGJ8v0_eJmotJqp7', 1428833321, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('EqcUNJoxnKnDsdjFoNplZhAT2jTfJmAC', 1425934372, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('FA1c5y3CXLOFKUqIgwRbYa0B7oLJCU9s', 1424702899, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('FU3Q1IcWOeHeboLcY7o1ncc6oaaqrVHG', 1426253656, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('FfH8_zieGNUYdEH4WwEF_eD_WROX45QO', 1428298364, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('HdbWmaeNQ38pVdk1ZBUHYsElsOZuiAyJ', 1428608728, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('IOADilT-yooiZukmzOhu4NsGw4tKa9aE', 1427711800, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Ius4x4yOx9gyMK8rlvfA0eJWa1sFNAwH', 1426235127, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('IvAXEv-xj6fQ6aAFvZ9RZDwwYw9kJDZO', 1426027147, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('JUXasJABcr3dCeeANeI8821wqxYRBOxX', 1428499712, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('JeghU-PtqQM-BXCPByoNM201rBs35EDk', 1426423941, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Ku95KU4kopjZVfiQpt95ROE677g47Irw', 1426090150, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('L-zb-if196kZ0q3auWxFbKW-Z4uHUlaA', 1429455891, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('LT426cHgvU4XTD6_e_VmshjLMsU50Hmq', 1426423942, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('LUWTj1-Y-P3XxmuwtzR9vYfzAU8mFCmQ', 1428707025, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('MDG6Yd2NDobd9BnYox0btGXXAedNQ22A', 1425751843, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('NNxCbAkcgWqcXjhxAca1uMD_LabuxP1-', 1427910335, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('OG1tuYPLk5hvM2n-fpYNRr53RnCORVns', 1424702903, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('OW33O8zVU7FLeC8mLqSdD3NxRfW8LY_4', 1427711799, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('OYDPwmoVWGFySRDm3mK6RJu7VI_v5imF', 1426761400, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('OwTAaa-AcJZYDRMZA3EgmKx8IBmwXp3K', 1425635386, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('P3FzFfjqZjq9Iiracs5QiJAnktJnzf1a', 1426709476, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('PQdCbGLHhw2VKxriiC-wScGaYmkOSmxI', 1424702894, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('PuHogrY5Kxp3taES-vSLNRMZb9m-XoyE', 1428484375, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('Q6zZr86zHinOBRdN0UUydd57uJZYA0x0', 1427458977, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('R5zOqqC3qB83qQwDDKKD2i5Pb38cVc8n', 1429775003, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('SFMLAcDJdGPXJTVig-kEtVEX_XIey7H6', 1428227560, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Sq5Z5wwP4enEsdZFK2-ZdvqNC1yB0wn5', 1428657055, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Sw4MI4reUF6YMXKCLv0EFoKwTXTuMuhZ', 1427458977, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('T-YFXs9PA_5CkbMRPdrnmTEIsiTtcZSx', 1426153823, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('T9Qrj_6DL-Z7ix0IY8zWRzRY7zjOXK8O', 1429095168, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Truv0cnGHkiYCBrva0UsBpzf9ZHxZ9js', 1425751843, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('TzS-dQMmoQP8bDgEKopgE1rPPTOYchVH', 1426253651, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('W6XaEq57pLgKTUCPS-XitePRdGxbtfEj', 1425635386, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('WZDeFR1dMXaXF1BdhYVLGFJyG7-iENLM', 1428091843, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('WqGhGfKiMExNaKfzLBS1KcGyKlq--BUO', 1429528697, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('XKwqReFNuKrkGOs4Ns_TveM-QlQM3jhO', 1428151555, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('YFE8PjTPPuP7MJCkbiN5okUPr4XfYvp-', 1428091842, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('Z9D7D6Rz13n_cH7qv8WVkhS3VmrKJzui', 1428484454, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('ZWYzo5yVbGWOxMl4QAHEzNVA0SuWg5r2', 1426335995, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":228,"admin":"N"}'),
('ZyPMtqjPlJn8BF-nMCz49We4J_r6fOXd', 1427187144, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('_2KBp5sxsBeE-JTy0dj3WIBTh2J5i_Bo', 1429614200, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('_UWWMoR6tVGzZVSDAqWoe3n_h5FfzgMk', 1426949024, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('_baSO1s8FtTTdtDtvgueZ9SVQIXi2TEh', 1429095168, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('_cUMvsbAZpQhCmnHpsXOPkcBK31fpI1_', 1427920255, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('agt80zuUs-_5x4GYLeYmCqONbWl40zp5', 1426761400, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('alJdSg6hVMWMpSmO9Cl4biriMV62rl03', 1424702897, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('am3iNwlnn-xAch9HGHN1TAkapLw7tZxH', 1427276762, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('awaS6pDZY7JYH8YAqC7RQDEwd0qJozlP', 1425751843, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('b1HfHazAwqp88fEThaozetyBJu8mtSa-', 1427369002, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('b3pfC53_hcaPEvkAaOmM--KmnP-jKa1R', 1427823253, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('bJNA1LTFWzpZowwSFhFJbEtk6NfIQjKZ', 1427823253, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('c2ODixtDtkWo294To7NLbVgaxPfXFY98', 1428159478, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('c46MMqan13h0s1eFW6aTGOxLRpKv-Fjc', 1429702213, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":229,"admin":"N"}'),
('cFCy5gu01CnZU68DldonL61NejfnWdTe', 1425859902, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('cV2TnhkpVZj2n-RQZRK_vZfsPZnsnUFV', 1425931058, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('cZOTTONSEkMod29BLGf8_Fl7rkryQOcA', 1424848886, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('cbvNDq30rCq5L5EhWpj0YrEbynCbPMFp', 1427458977, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('ctPnVmEJs0JJOeZvrBU-jfsJxJWJAsiq', 1427711799, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('d9q01K2tJsyLtg_u3JuwP4-gUmM6kZST', 1425635386, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('dWewDQw4E8CJiVUOCR9LRIt9b8qevsVy', 1429358422, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":224,"admin":"N"}'),
('dXGShzZ8ICUmwB9IdIDFtbByyFZlHA3d', 1429614127, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('eaJF6BNUyJ6etnr1XuShH13JiFqq0htX', 1429735554, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('f2jLAgzDKVzW2wXOH_d1qYfT13LyBSbO', 1427998162, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('fuszlrJdaxmnOK19QTIdmr7Py1QkJv7V', 1425477998, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('gE2jA2vtMpj4iWzrLb6bO1i1X1zC1gsg', 1428844854, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('hbWkEanch3TDgmm4Q25pZKI-ESouYNGA', 1429735554, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('iIDooj0nD8MTAId6cKU56oRWS-q6ceb-', 1426949024, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('iUvI5y77i4A5rJS_33py9tehTeMTyHIY', 1428499712, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('iyH1wnzWlyQ3zT_eXqQ6JMt59c0Cod8z', 1425751843, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('jQ4hMWhnEX0BT3XnFGGZ3HdxRGHbYvVm', 1427823253, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('k5MYNfG3rhl5i8sGFHcmXojvzsWE0hBJ', 1427910335, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('kN7c0vp5LJuvLILnxrnd4OaHwg66rwaY', 1426761400, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('krJFknCuKstj2NjiknvB1irEGxD8k7Al', 1428681954, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('kv4yxiu-1kV5BJwi3Y3fKszMpSQkTniA', 1424855577, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('l_Yv1Ojqdbl1u6iPSozh60C-Hrgyxzgv', 1426153823, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('mCqsqPJSuE016WmqmdEOiZolVDkc1eiH', 1427910335, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('mviznzx76pzqjAz9wd2DKK_f3X-wpwh4', 1429806081, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('oSkJJW8h-U3oFZXvxF11FMNCSN0nE33i', 1429556344, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('og3f6jbCwxLYJAb4x7juZFV514NgIX5M', 1425477993, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('oy6PODTboaFRVECNz-LzJ0fn2aom7sXT', 1427276762, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('p8kbqEE_GySA5MmWG_37Mge8AJWxI9gh', 1426423942, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('qK3UEWbodGTNut16xxdh94CCyCRmXdHS', 1426027147, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('r81dafLGNtIDVBlmFzdPoW5kn8lHAqFY', 1429631970, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('ruC2oa-E6CfgfHq6EMZmIYLsNyUAnorP', 1428006011, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('ryI-LPUA6jOeI77nRBhU4-F6ldB7wUPX', 1424972563, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('s2O9g1kdLS_AC29I-r2NTTT6KHtwmD8Y', 1426423941, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('s51xHxw7RFZ90CP5BRSfZSWIqMoK5Qn-', 1428151558, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('t7fWO1NmK93qGLj9_PJUZCUf-p00i2pu', 1428657055, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('tzNbiKEdBcN3hT_nbQ3Yl2sESHxYgcEe', 1428149257, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":228,"admin":"N"}'),
('u9MOenW9MM7p6a2-15UYrcsXu2gupt3-', 1429279336, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":226,"admin":"Y"}'),
('uvVJYOOwP3Qmo-rl1IHZB7uAavBBuJ1g', 1428755710, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('vWe-K-engpT8MuRVRNAscuz-q3X21NGH', 1425477993, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('wEXPmgcilv0WN3Uzl1xn6Qoksx_0e_M2', 1427823253, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('wxzIgrPfaBrmnAeJqJzaq3Z2E0r0qkES', 1429694697, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('x8LN9e9sMqgKS4xRbrsEQsrzI0ylp66W', 1429263332, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('xpsxRkDGIgbMIrl0mvghjHpvmlrHelp7', 1428298364, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('y0Ka8saW78lN1dm0g_Ss8RALOPcanF0U', 1429540491, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('yS3_m2fJsN8Pgqtt9a8Fq0alkOWtcVO-', 1429614127, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('yeOMq7RmtMMBDTR8QKqjeXfB2RV8JxsY', 1425544314, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":6,"admin":"N"}'),
('ynob3_OSHhBr8bmck6lOLGWeWjzzmS4u', 1427873946, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user":187,"admin":"Y"}'),
('yr8t0djJNXL9bplkihpGoeJrwg4C_VuF', 1427276762, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('ythQje7rIA-EIqVjPopGmLBElrlifG5x', 1427187144, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('zBt_KFSHZVprlOyF-9PICpKBiBhVcXHo', 1429263331, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('z_LdRZTEcTdixBi4dKLTKdyz4-0LviUa', 1426235126, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
('zqLna4LM8juvCUk2S4NnP6bkx-c-wT0F', 1424702898, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}');

-- --------------------------------------------------------

--
-- Структура таблицы `sprint`
--

CREATE TABLE IF NOT EXISTS `sprint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

--
-- Дамп данных таблицы `team`
--

INSERT INTO `team` (`id`, `title`) VALUES
(1, 'Raiders'),
(2, 'Stingray'),
(18, 'Bitbangers'),
(29, 'Stormtroopers'),
(35, 'Developers');

-- --------------------------------------------------------

--
-- Структура таблицы `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` varchar(15) NOT NULL,
  `owner` varchar(15) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Дамп данных таблицы `test`
--

INSERT INTO `test` (`id`, `pid`, `name`, `status`, `owner`, `description`) VALUES
(1, 17, 'RealTest', 'design', '', 'This is a test'),
(2, 17, 'Real Test 2', 'new', '', ''),
(3, 17, 'Test3', 'new', '', ''),
(4, 17, 'Test4', 'new', '', ''),
(5, 17, 'Test5', 'new', '', ''),
(6, 17, 'test6', 'new', '', ''),
(7, 17, 'test7', 'new', '', ''),
(8, 17, 'test8', 'new', '', ''),
(9, 17, 'test9', 'new', '', ''),
(10, 3, 'test', 'new', '', ''),
(11, 5, 'NewTest', 'new', '', ''),
(12, 47, 'Test1', 'new', '', 'wrthrthrt'),
(13, 47, 'Test2', 'new', '', 'f');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `sname` varchar(45) DEFAULT NULL,
  `pname` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `password` varchar(40) DEFAULT NULL,
  `admin` varchar(1) NOT NULL,
  `bg` varchar(18) NOT NULL,
  `tid` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=242 ;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `sname`, `pname`, `role`, `password`, `admin`, `bg`, `tid`) VALUES
(5, 'Serhii', 'Diahlev', 'sdiahlev', 'SQA', '32cf6c48a591bc02125b4c7b8bf1ebcb9380ada0', 'N', 'Band 1 / TT06', 2),
(6, 'Maksym', 'Ludanov', 'mludanov', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT06', 2),
(187, 'Konstantin', 'Allakhvierdov', 'glkallak', 'SQA', 'cc49ee3ba32bdd12f83dafeed2cb27fcb36eb9ab', 'Y', '', 2),
(224, 'Oleksandr', 'Buratynskiy', 'oburatyn', 'SQA', '568399065096dfcf8962a71464f127d15d76ddc0', 'N', 'Band 1 / TT04', 1),
(225, 'Oleg', 'Krivokobilskiy', 'okryvoko', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT06', 1),
(226, 'Oleksandr', 'Dolnyk', 'odolnyk', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'Y', 'Band 1 / TT04', 2),
(227, 'Oleksandr', 'Kurochkin', 'okurochk', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT06', 1),
(228, 'Nazar', 'Silchenko', 'nsilchen', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT04', 18),
(229, 'Yurii', 'Zaremba', 'yzaremba', 'SQA', 'bf6999cfdaa7eb56e446d95dbc713cc7d748edfa', 'N', 'Band 1 / TT06', 18),
(230, 'Iaroslav', 'Gerasimenko', 'igerasym', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT06', 29),
(231, 'Larysa', 'Syrevych', 'gllsyrev', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 2 / TT08', 29),
(232, 'Oleksandr', 'Sozanskyi', 'osozansk', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT04', 29),
(233, 'Dmytro', 'Chukhalenko', 'gldchukh', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 2 / TT08', 29),
(234, 'Oleg', 'Pashyn', 'glopashy', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT06', 29),
(235, 'Yevgeniya', 'Karpus', 'ykarpus', 'Dev', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', '', 35),
(236, 'Konstantin', 'Ponomarenko', 'kponom', 'Dev', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', '', 35),
(237, 'Nataliia', 'Geryk', 'ngeryk', 'Dev', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', '', 35),
(238, 'Konstantin', 'Slipchenko', 'kslipc', 'Dev', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', '', 35),
(239, 'Iakiv', 'Shchelkunov', 'ishelk', 'Dev', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', '', 35),
(240, 'Mariia', 'Maliavko', 'mmaliavko', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT04', 1),
(241, 'Olga', 'Shkurka', 'oshkurka', 'SQA', '2c8e8c6044d03932ecb46600946ccb9e17f63ba4', 'N', 'Band 1 / TT04', 29);

-- --------------------------------------------------------

--
-- Структура таблицы `usertoteam`
--

CREATE TABLE IF NOT EXISTS `usertoteam` (
  `utid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `tid` int(11) DEFAULT NULL,
  PRIMARY KEY (`utid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Дамп данных таблицы `usertoteam`
--

INSERT INTO `usertoteam` (`utid`, `uid`, `tid`) VALUES
(1, 6, 2),
(5, 8, 1),
(15, 5, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `_dates_207`
--

CREATE TABLE IF NOT EXISTS `_dates_207` (
  `id` int(11) DEFAULT NULL,
  `data` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
