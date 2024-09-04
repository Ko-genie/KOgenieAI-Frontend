import Link from "next/link";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import { getServerSideProps } from "../../utils/functions";
import { useProfile } from "@/hooks/user.hook";
import { useEffect, useState } from "react";
import { GENDER } from "@/helpers/coreConstant";
import { useTranslation } from "react-i18next";

const AccountSetting = () => {
  const [selectedDate, setSelectedDate] = useState<any>();
  const [openProPic, setopenProPic] = useState(false);

  const {
    isLoading,
    user,
    Controller,
    control,
    setValue,
    errors,
    register,
    handleSubmit,
    handleProfileUpdate,
    uploadImageUrlForProPic,
    setuploadImageUrlForProPic,
    siteProPicId,
    setsiteProPicId,
  } = useProfile();
  useEffect(() => {
    if (!siteProPicId) {
      return;
    }
    setValue("file_id", siteProPicId);
  }, [siteProPicId]);
  useEffect(() => {
    if (!user) return;
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("user_name", user.user_name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("country", {
      label: user.country,
      value: user.country,
    });
    setuploadImageUrlForProPic(user?.photo);
    setValue("address", user.address);
    setValue("birth_date", user.birth_date);
    setValue("gender", {
      label:
        Number(user.gender) === GENDER.MALE
          ? "Male"
          : Number(user.gender) === GENDER.FEMALE
          ? "Female"
          : "Other",
      value:
        Number(user.gender) === GENDER.MALE
          ? GENDER.MALE
          : Number(user.gender) === GENDER.FEMALE
          ? GENDER.FEMALE
          : GENDER.OTHERS,
    });
    setSelectedDate(new Date(user.birth_date));
  }, [user]);
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setValue("birth_date", date);
  };
  const { t } = useTranslation();
  return (
    <div className="container min-h-screen dark:text-white">
      <ul className="mt-5 flex space-x-2 rtl:space-x-reverse px-6">
        <li>
          <Link href="#" className="text-primary hover:underline">
            {t("Users")}
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>{t("Profile")}</span>
        </li>
      </ul>
      <div className="pt-5 px-6">
        <div>
          <form
            onSubmit={handleSubmit(handleProfileUpdate)}
            className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black"
          >
            <h6 className="mb-5 text-lg font-bold">{t("Profile Information")}</h6>
            <div className="flex flex-col md:flex-row">
              <div className="mb-5 w-full md:w-4/12 xl:w-3/12 ltr:sm:mr-4 rtl:sm:ml-4">
                <ImagePicker
                  open={openProPic}
                  name={"Profile Photo"}
                  setopen={setopenProPic}
                  uploadImageUrl={uploadImageUrlForProPic}
                  setuploadImageUrl={setuploadImageUrlForProPic}
                  setId={setsiteProPicId}
                  width="240px"
                  height="280px"
                  minHeight="280px"
                  minWidth="180px"
                />
              </div>
              <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 w-full md:w-8/12 xl:w-9/12">
                <div>
                  <label htmlFor="first_name">{t("First Name")}</label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="Jimmy"
                    className="form-input"
                    {...register("first_name")}
                  />
                </div>
                <div>
                  <label htmlFor="last_name">{t("Last Name")}</label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Turner"
                    className="form-input"
                    {...register("last_name")}
                  />
                </div>
                <div>
                  <label htmlFor="user_name">User Name</label>
                  <input
                    id="user_name"
                    type="text"
                    placeholder="Turner"
                    className="form-input"
                    {...register("user_name")}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    disabled
                    placeholder="jimmy@gmail.com"
                    className="form-input"
                    {...register("email")}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="+1 (530) 555-12121"
                    className="form-input"
                    {...register("phone")}
                  />
                </div>
                <div>
                  <label>Country</label>

                  <Controller
                    control={control}
                    name="country"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={[
                          { value: "All Countries", label: "All Countries" },
                          { value: "United States", label: "United States" },
                          { value: "India", label: "India" },
                          { value: "Japan", label: "Japan" },
                          { value: "China", label: "China" },
                          { value: "Brazil", label: "Brazil" },
                          { value: "Norway", label: "Norway" },
                          { value: "Canada", label: "Canada" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.country?.message}</small>
                  </p>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="birth_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Birth Date
                  </label>
                  <div className="mt-1">
                    <ReactDatePicker
                      id="birth_date"
                      className="form-input w-full"
                      dateFormat="yyyy-MM-dd"
                      selected={selectedDate}
                      //@ts-ignore
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
                <div>
                  <label>Gender</label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={[
                          { value: 1, label: "Male" },
                          { value: 2, label: "Female" },
                          { value: 3, label: "Other" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.gender?.message}</small>
                  </p>
                </div>

                <div className="mt-3 sm:col-span-2">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export { getServerSideProps };

export default AccountSetting;
