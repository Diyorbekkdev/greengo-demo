import { AnswersCategories } from "./page";
import {
    AppstoreOutlined, UnorderedListOutlined
} from "@ant-design/icons";
import { Answers } from "@/modules/answer-category/page/answers/answers.component.tsx";

export const answersRoutes = [
    {
        key: "/answers-categories",
        Element: AnswersCategories,
        label: "Answers Categories",
        icon: AppstoreOutlined,
        children: [

        ],
        visible: true,
        access: "main",
    },
    {
        key: "/answers-categories/:slug",
        Element: Answers,
        label: "Answers",
        icon: UnorderedListOutlined,
        children: [
        ],
        visible: false,
        access: "main",
    },
];
