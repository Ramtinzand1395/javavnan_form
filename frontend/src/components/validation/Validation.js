import * as Yup from "yup";

export const dinnerValidation = Yup.object().shape({
  dinnerStatus: Yup.mixed().oneOf(
    ["nodinner", "olvie", "calbas", null],
    "یکی از  وضعیت ها را انتخاب کنید"
  ),
  drinksStatus: Yup.mixed().oneOf(
    ["cocakola", "fanta", "noDrink", null],
    "یکی از  وضعیت ها را انتخاب کنید"
  ),
  price: Yup.string().required(" ثیمت الزامی می باشد"),
});

export const userValidation = Yup.object().shape({
  name: Yup.string()
    .required("نام الزامی می باشد")
    .min(3, "نام  نباید کمتر از 3 کاراکتر باشد")
    .max(255, "نام  نباید بیشتر از 255 کاراکتر باشد"),
  lastname: Yup.string()
    .required("  نام خانوادگی الزامی می باشد")
    .min(3, "  نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
    .max(255, "نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
});
