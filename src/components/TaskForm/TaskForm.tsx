import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/taskService";
import type { NewTaskData } from "../../types/task";

const initialValues: NewTaskData = {
  title: "",
  content: "",
  tag: "Todo",
};

interface TaskFormProps {
  onCancel: () => void;
}

const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title is to short")
    .max(50, "Title is to longh")
    .required("This field is required"),
  content: Yup.string().max(500, "Content should not be more then 500 symbols"),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Incorrect value"
    )
    .required("Tag is required"),
});

export default function TaskForm({ onCancel }: TaskFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (taskData: NewTaskData) => createTask(taskData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onCancel();
    },
  });

  const handleSubmit = (
    values: NewTaskData,
    formikHelpers: FormikHelpers<NewTaskData>
  ) => {
    mutate(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TaskSchema}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create task"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
