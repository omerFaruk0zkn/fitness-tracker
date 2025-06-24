import {
  Home,
  Dumbbell,
  BicepsFlexed,
  MonitorUp,
  ChartColumn,
} from "lucide-react";
import AuthCarousel1 from "../assets/auth-carousel/auth-carousel1.webp";
import AuthCarousel2 from "../assets/auth-carousel/auth-carousel2.webp";
import AuthCarousel3 from "../assets/auth-carousel/auth-carousel3.webp";
import AuthCarousel4 from "../assets/auth-carousel/auth-carousel4.webp";
import AuthCarousel5 from "../assets/auth-carousel/auth-carousel5.webp";
import AuthCarousel6 from "../assets/auth-carousel/auth-carousel6.webp";

export const AUTH_CAROUSEL_IMAGES = [
  AuthCarousel1,
  AuthCarousel2,
  AuthCarousel3,
  AuthCarousel4,
  AuthCarousel5,
  AuthCarousel6,
];

export const NAVLINKS = [
  { label: "Ana Sayfa", path: "/", icon: Home },
  { label: "Egzersizler", path: "/exercises", icon: Dumbbell },
  { label: "Antrenman", path: "/workout", icon: BicepsFlexed },
  { label: "Gelişim", path: "/progress", icon: MonitorUp },
  { label: "Gelişim Grafikleri", path: "/charts", icon: ChartColumn },
];

export const MUSCLE_GROUP_ITEMS = [
  "Tümü",
  "Göğüs",
  "Sırt",
  "Bacak",
  "Kol",
  "Omuz",
  "Karın",
  "Full Vücut",
];

export const REGISTER_FORM_CONTROLS = [
  {
    name: "name",
    label: "Ad Soyad",
    placeholder: "Adınızı giriniz",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "E-posta",
    placeholder: "E-posta adresinizi giriniz",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Şifre",
    placeholder: "Şifrenizi giriniz",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Şifre Onay",
    placeholder: "Şifrenizi onaylayınız",
    componentType: "input",
    type: "password",
  },
  {
    name: "height",
    label: "Boy (cm)",
    placeholder: "Boy bilginizi giriniz",
    componentType: "input",
    type: "text",
  },
  {
    name: "weight",
    label: "Kilo (kg)",
    placeholder: "Kilo bilginizi giriniz",
    componentType: "input",
    type: "text",
  },
];

export const LOGIN_FORM_CONTROLS = [
  {
    name: "email",
    label: "E-posta",
    placeholder: "E-posta adresinizi giriniz",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Şifre",
    placeholder: "Şifrenizi giriniz",
    componentType: "input",
    type: "password",
  },
];

export const EDIT_PROFILE_CONTROLS = [
  {
    name: "profileImg",
    label: "Profil Resmi",
    placeholder: "Profil resmi seçiniz",
    componentType: "input",
    accept: "image/*",
    type: "file",
  },
  {
    name: "name",
    label: "Ad Soyad",
    placeholder: "İsminizi giriniz",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "E-posta",
    placeholder: "E-posta adresinizi giriniz",
    componentType: "input",
    type: "email",
  },
  {
    name: "target_weight",
    label: "Hedef Kilo",
    palceholder: "Hedef kilonuzu giriniz",
    componentType: "input",
    type: "text",
  },
  {
    name: "weight",
    label: "Mevcut Kilo",
    palceholder: "Mevcut kilonuzu giriniz",
    componentType: "input",
    type: "text",
  },
];

export const ADD_EXERCISE_CONTROLS = [
  {
    name: "video",
    label: "Egzersiz Videosu",
    placeholder: "Egzersiz videosu seçiniz",
    componentType: "input",
    accept: "video/*",
    type: "file",
  },
  {
    name: "name",
    label: "Egzersiz Başlık",
    placeholder: "Egzersiz başlığını giriniz",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Egzersiz Açıklama",
    placeholder: "Egzersiz açıklamasını giriniz",
    componentType: "textarea",
  },
  {
    name: "muscleGroup",
    label: "Kas Grubu",
    placeholder: "Kas grubunu giriniz",
    componentType: "select",
    options: [
      { id: "Göğüs", label: "Göğüs" },
      { id: "Sırt", label: "Sırt" },
      { id: "Bacak", label: "Bacak" },
      { id: "Kol", label: "Kol" },
      { id: "Omuz", label: "Omuz" },
      { id: "Karın", label: "Karın" },
      { id: "Full Vücut", label: "Full Vücut" },
    ],
  },
];

export const CREATE_PROGRESS_CONTROLS = [
  {
    name: "date",
    label: "Tarih",
    componentType: "date",
  },
  {
    name: "weight",
    label: "Kilo",
    placeholder: "KG",
    componentType: "input",
    type: "text",
  },
  {
    name: "shoulder",
    label: "Omuz Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "chest",
    label: "Göğüs Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "waist",
    label: "Bel Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "hip",
    label: "Kalça Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "arm_right",
    label: "Sağ Kol Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "arm_left",
    label: "Sol Kol Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "leg",
    label: "Bacak Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
  {
    name: "abdominal",
    label: "Karın Ölçüsü",
    placeholder: "CM",
    componentType: "input",
    type: "text",
  },
];
