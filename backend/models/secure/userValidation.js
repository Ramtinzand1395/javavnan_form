const Yup = require("yup");

exports.schema = Yup.object().shape({
    name: Yup.string()
        .required("نام الزامی می باشد")
        .min(3, "نام  نباید کمتر از 3 کاراکتر باشد")
        .max(255, "نام  نباید بیشتر از 255 کاراکتر باشد"),
        lastname: Yup.string()
        .required("  نام خانوادگی الزامی می باشد")
        .min(3, "  نام خانوادگی نباید کمتر از 3 کاراکتر باشد")
        .max(255, "نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
});


