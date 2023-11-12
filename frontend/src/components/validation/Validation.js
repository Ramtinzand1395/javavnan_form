import * as Yup from "yup";

export const dinnerValidation = Yup.object().shape({
  dinner: Yup.mixed()
    .oneOf(
      ["nodinner", "olvie", "calbas", null],
      "یکی از  وضعیت ها را انتخاب کنید"
    )
    .required("لطفاً یک گزینه شام را انتخاب کنید."),
  drinks: Yup.mixed()
    .oneOf(
      ["cocakola", "fanta", "noDrink", null],
      "یکی از  وضعیت ها را انتخاب کنید"
    )
    .required("لطفاً یک گزینه نوشیدنی را انتخاب کنید."),
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
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "شماره موبایل صحیح نمیباشد.")
    .required("موبایل الزامی میباشد."),
});
