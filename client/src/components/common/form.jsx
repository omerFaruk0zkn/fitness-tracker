import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, EyeClosed, Loader, Trash } from "lucide-react";
import { getIn } from "formik";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import CalendarField from "../forms/calendar-field";

const CommonForm = ({
  formControls,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  buttonText,
  setFieldValue,
  customClass,
  existingVideoUrl,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRefs = useRef({});

  const videoPreview = useMemo(() => {
    if (values.video instanceof File) {
      return URL.createObjectURL(values.video);
    }
    if (typeof values.video === "string") {
      return values.video;
    }
    if (existingVideoUrl) {
      return existingVideoUrl;
    }
    return null;
  }, [values.video, existingVideoUrl]);

  useEffect(() => {
    return () => {
      if (values.video instanceof File) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview, values.video]);

  const renderInputsByComponentType = (item) => {
    const value = getIn(values, item.name) || "";

    const inputType =
      item.type === "password"
        ? item.name === "password"
          ? showPassword
            ? "text"
            : "password"
          : item.name === "confirmPassword"
          ? showConfirmPassword
            ? "text"
            : "password"
          : "password"
        : item.type;

    switch (item.componentType) {
      case "input":
        if (item.type === "file") {
          const profileImgPreview =
            values.profileImg && typeof values.profileImg === "object"
              ? URL.createObjectURL(values.profileImg)
              : typeof values.profileImg === "string"
              ? values.profileImg
              : null;

          return (
            <>
              {(profileImgPreview || (values.video && videoPreview)) && (
                <div className="relative w-fit">
                  {values.profileImg && (
                    <img
                      src={profileImgPreview}
                      alt="Seçilen profil"
                      className="size-16 object-cover rounded-full mb-2"
                    />
                  )}

                  {videoPreview && (
                    <video
                      src={videoPreview}
                      controls
                      className="aspect-video max-w-xs w-full rounded-md shadow-md"
                    />
                  )}

                  <Trash
                    onClick={() => {
                      setFieldValue(item.name, "");
                      if (fileInputRefs.current[item.name]) {
                        fileInputRefs.current[item.name].value = "";
                      }
                    }}
                    className={`${
                      values.profileImg ? "size-5" : "size-7"
                    } absolute ${
                      values.profileImg ? "-top-1 -right-1" : "-top-2 -right-2"
                    } bg-destructive text-accent p-1 rounded-full hover:scale-105 hover:cursor-pointer`}
                  />
                </div>
              )}

              <Input
                ref={(el) => (fileInputRefs.current[item.name] = el)}
                id={item.name}
                name={item.name}
                accept={item.accept}
                type={inputType}
                onChange={(e) => {
                  setFieldValue(item.name, e.currentTarget.files[0]);
                }}
              />
            </>
          );
        }

        if (item.type === "number") {
          return (
            <Input
              name={item.name}
              placeholder={item.placeholder}
              id={item.name}
              type={inputType}
              value={value}
              min={0}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        }

        return (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            onValueChange={(value) => setFieldValue(item.name, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((selectItem) => (
                    <SelectItem key={selectItem.id} value={selectItem.id}>
                      {selectItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        );

      case "date":
        return (
          <CalendarField
            name={item.name}
            value={value}
            onChange={(val) => setFieldValue(item.name, val)}
          />
        );

      default:
        return (
          <Input
            id={item.name}
            name={item.name}
            type={inputType}
            placeholder={item.placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={customClass ? customClass : "flex flex-col gap-3"}
    >
      {formControls.map((item) => (
        <div key={item.name} className="grid w-full gap-1.5">
          <Label htmlFor={item.name} className="mb-1 text-foreground">
            {item.label}
          </Label>

          <div className="relative">
            {renderInputsByComponentType(item)}

            {item.type === "password" && (
              <div className="absolute right-2 top-2 cursor-pointer">
                {item.name === "password" ? (
                  !showPassword ? (
                    <Eye
                      onClick={() => setShowPassword(true)}
                      className="text-primary"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setShowPassword(false)}
                      className="text-primary"
                    />
                  )
                ) : item.name === "confirmPassword" ? (
                  !showConfirmPassword ? (
                    <Eye
                      onClick={() => setShowConfirmPassword(true)}
                      className="text-primary"
                    />
                  ) : (
                    <EyeClosed
                      onClick={() => setShowConfirmPassword(false)}
                      className="text-primary"
                    />
                  )
                ) : null}
              </div>
            )}
          </div>

          {touched[item.name] && errors[item.name] && (
            <p className="text-destructive text-sm">{errors[item.name]}</p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="mt-2 w-full flex items-center gap-2"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader size={16} className="animate-spin" />}
        {buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
