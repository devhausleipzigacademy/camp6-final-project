import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { BookGrid } from "./BookGrid";

// some fake book data to use in Book Grid story
const bookExamples = [
    {
        title: "The Divine Comedy",
        author: "Dante Alighieri",
        language: "srr",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Soluta libero vitae autem et quidem molestiae dolores sint enim. Ea consequatur alias sed. Exercitationem sed aut recusandae incidunt. Saepe laudantium et nulla et ut ipsam reprehenderit ut. Tenetur et facere quo et ut voluptas odio.",
        isbn: "44449dc3-2853-4042-a02c-e4ac1c7324f5",
        publishYear: "2033-06-04T00:51:52.412Z",
        genres: ["Fantasy", "Humor"],
        tags: ["variable", "front", "wry"],
        isReserved: true,
        ownerId: "e3687f2e-92ee-4b02-b15b-0a470dbfa79d",
        identifier: "f7ea8ac1-e247-4db1-a955-cfa6139474f7",
        createdAt: "2022-09-28T19:01:04.195Z",
        updatedAt: "2022-09-28T19:01:04.196Z",
        borrowerId: null,
    },
    {
        title: "doar",
        author: "tua",
        language: "en",
        image: null,
        description: null,
        isbn: null,
        publishYear: null,
        genres: [],
        tags: [],
        isReserved: false,
        ownerId: "e3687f2e-92ee-4b02-b15b-0a470dbfa79d",
        identifier: "122e8e74-b754-43cb-b54f-feaabb96bc7d",
        createdAt: "2022-09-28T19:01:04.209Z",
        updatedAt: "2022-09-28T19:01:04.210Z",
        borrowerId: null,
    },
    {
        title: "Things Fall Apart",
        author: "Chinua Achebe",
        language: "xpg",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Dolorem et alias nobis dolores nobis error est. Sed ducimus sint amet. Pariatur amet nostrum aut quos. Quod sapiente similique qui.",
        isbn: "617b2a1f-61e4-4a1b-85c9-78711da924d1",
        publishYear: "2031-08-14T11:17:33.247Z",
        genres: ["Memoir", "Romance"],
        tags: ["loving", "measly", "ignorant"],
        isReserved: false,
        ownerId: "e5f15883-c8eb-4e8d-a3b5-a1e7f7b015ef",
        identifier: "e0f4b5ef-5f29-47d9-8a0c-c0106c070c9d",
        createdAt: "2022-09-28T09:28:32.136Z",
        updatedAt: "2022-09-28T09:28:32.137Z",
        borrowerId: null,
    },
    {
        title: "doar",
        author: "tua",
        language: "en",
        image: null,
        description: null,
        isbn: null,
        publishYear: null,
        genres: [],
        tags: [],
        isReserved: false,
        ownerId: "e5f15883-c8eb-4e8d-a3b5-a1e7f7b015ef",
        identifier: "ab527806-9bd7-4a33-bd14-8b7127e3bb6c",
        createdAt: "2022-09-28T09:28:32.151Z",
        updatedAt: "2022-09-28T09:28:32.151Z",
        borrowerId: null,
    },
    {
        title: "Gulliver's Travels",
        author: "Jonathan Swift",
        language: "nan",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Voluptatem repudiandae totam. Iusto consequatur repudiandae quia temporibus et. Accusantium omnis eos recusandae omnis ut doloremque ea impedit tenetur. Quibusdam exercitationem qui. Molestiae minus id.",
        isbn: "462d3ff8-d0b6-40cf-a7ef-b7171f89a3cd",
        publishYear: "1999-07-05T22:42:30.284Z",
        genres: ["Contemporary", "Dystopian"],
        tags: ["pale", "brilliant", "large"],
        isReserved: true,
        ownerId: "9ba3d8f9-f357-4fc3-98cf-c45bd51dbbc4",
        identifier: "2b03d677-f583-4bb3-9fe5-1cee6930ff2a",
        createdAt: "2022-09-28T09:28:32.186Z",
        updatedAt: "2022-09-28T09:28:32.207Z",
        borrowerId: null,
    },
    {
        title: "The Book Of Job",
        author: "Unknown",
        language: "hy",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Cupiditate deserunt eius facilis qui sit quis molestiae. Cum impedit distinctio vitae ut ullam sequi aspernatur qui. Aspernatur veritatis asperiores amet animi atque reiciendis odit. Aut ea velit minus aut vitae voluptate aut. Ullam quis voluptatem esse voluptas necessitatibus alias veniam est ut. Aut magni recusandae ipsum repellendus. At qui maxime quos ut ut ipsam facere.",
        isbn: "84c2586d-ccff-469f-987b-3543bb570128",
        publishYear: "2057-02-18T05:34:49.739Z",
        genres: ["Guide / How-to", "Science Fiction"],
        tags: ["simple", "informal", "merry"],
        isReserved: true,
        ownerId: "c3c3ce43-5d37-4d4a-9b9a-69e6ea55a51b",
        identifier: "0574f539-0244-4cd7-b74f-7c5e663346eb",
        createdAt: "2022-09-28T14:15:23.456Z",
        updatedAt: "2022-09-28T14:15:23.456Z",
        borrowerId: null,
    },
    {
        title: "doar",
        author: "tua",
        language: "en",
        image: null,
        description: null,
        isbn: null,
        publishYear: null,
        genres: [],
        tags: [],
        isReserved: false,
        ownerId: "c3c3ce43-5d37-4d4a-9b9a-69e6ea55a51b",
        identifier: "7a6d4f42-9b31-4da0-b0a3-e6bee6413f3c",
        createdAt: "2022-09-28T14:15:23.469Z",
        updatedAt: "2022-09-28T14:15:23.470Z",
        borrowerId: null,
    },
    {
        title: "The Stranger",
        author: "Albert Camus",
        language: "mai",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Qui suscipit quas qui laboriosam eius dolore. At voluptatem aut soluta vel cumque nihil. Et quibusdam corporis voluptate est vel et. Ullam tempora aperiam eum consequatur voluptas aut ut. Nihil vel eum accusamus et temporibus illum quis ipsam sit.",
        isbn: "3178fa46-7e97-4b3b-a98e-de0327f0d922",
        publishYear: "2016-11-27T07:52:20.929Z",
        genres: ["Science Fiction", "Humor"],
        tags: ["popular", "threadbare", "bad"],
        isReserved: true,
        ownerId: "8f452c6a-0be0-482a-9307-01e23033671b",
        identifier: "073f2b09-f4be-4075-9c77-5855fdb33799",
        createdAt: "2022-09-28T14:15:23.508Z",
        updatedAt: "2022-09-28T14:15:23.530Z",
        borrowerId: null,
    },
    {
        title: "Blindness",
        author: "José Saramago",
        language: "jaz",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Nihil qui sed ipsum. Ut enim est aut consequuntur est omnis quae. Dignissimos asperiores esse. Earum explicabo repellendus consequatur quasi qui voluptas corrupti dolor. Natus quo qui ea. Dolore in minus id laborum. Atque consectetur illo.",
        isbn: "8137f0f1-6517-4c2e-870c-4f5a73a5fc69",
        publishYear: "2018-11-25T16:06:05.192Z",
        genres: ["Memoir", "Romance"],
        tags: ["both", "lanky", "fancy"],
        isReserved: true,
        ownerId: "05d10051-8b1e-4e2a-8421-e221b078f12f",
        identifier: "a7a3c0a3-754e-49df-90dd-b61387883a8f",
        createdAt: "2022-09-28T14:15:26.185Z",
        updatedAt: "2022-09-28T14:15:26.210Z",
        borrowerId: null,
    },
    {
        title: "Fairy tales",
        author: "Hans Christian Andersen",
        language: "af",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Temporibus est doloribus expedita ut sequi dolorum sint. Quia placeat ut natus. Placeat facere cum aut. Reiciendis inventore id reiciendis molestias veniam recusandae quidem. Aut repudiandae labore numquam sapiente dolores. Sit fuga sed et.",
        isbn: "08cc9415-2348-4940-a64c-fb2d851ae5bc",
        publishYear: "2043-01-01T23:41:22.354Z",
        genres: ["Motivational", "Health"],
        tags: ["well-groomed", "devoted", "drab"],
        isReserved: false,
        ownerId: "300f7ee2-7a73-4dea-aa06-37d9464a05dd",
        identifier: "f791ba9b-bba9-445e-9f8a-53eab5b3bb0a",
        createdAt: "2022-09-28T14:15:26.140Z",
        updatedAt: "2022-09-28T14:15:26.141Z",
        borrowerId: null,
    },
    {
        title: "doar",
        author: "tua",
        language: "en",
        image: null,
        description: null,
        isbn: null,
        publishYear: null,
        genres: [],
        tags: [],
        isReserved: false,
        ownerId: "300f7ee2-7a73-4dea-aa06-37d9464a05dd",
        identifier: "55821614-c9c6-4836-b143-907268f82958",
        createdAt: "2022-09-28T14:15:26.152Z",
        updatedAt: "2022-09-28T14:15:26.152Z",
        borrowerId: null,
    },
    {
        title: "Metamorphoses",
        author: "Ovid",
        language: "afh",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Et et harum odit labore. Facere repellat eum ea in provident delectus quod autem maxime. Minus voluptas adipisci numquam est ipsam itaque quos. Dolores est tempora vel aut voluptatem aut adipisci. Assumenda doloremque necessitatibus earum nulla voluptas in aliquam.",
        isbn: "e376af71-401c-4f6f-8b26-279932055b2e",
        publishYear: "2054-06-06T06:42:20.632Z",
        genres: ["Adventure", "Art"],
        tags: ["identical", "weird", "actual"],
        isReserved: true,
        ownerId: "949b2d5f-7a67-428b-b76d-e8dc50722364",
        identifier: "9ba74e86-9b6f-4931-ada3-67189010793b",
        createdAt: "2022-09-28T14:15:27.834Z",
        updatedAt: "2022-09-28T14:15:27.855Z",
        borrowerId: null,
    },
    {
        title: "Pippi Longstocking",
        author: "Astrid Lindgren",
        language: "pl",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Repellat sed laudantium necessitatibus dolorem. Esse vel doloribus omnis vitae. Et voluptatem ipsa aspernatur pariatur corrupti nisi voluptatibus iste id. Ullam accusantium tempore dolorum. Molestias perferendis est qui alias modi. Amet iusto et at et aut. Sed labore explicabo aut rerum voluptas explicabo vero numquam temporibus.",
        isbn: "aff10b37-ee4c-45b4-9512-f6bef3db479c",
        publishYear: "2095-07-12T01:14:08.994Z",
        genres: ["Contemporary", "Thriller"],
        tags: ["reasonable", "plain", "pesky"],
        isReserved: false,
        ownerId: "c4e84abc-3e60-4fbd-ac3c-946dae48b6fc",
        identifier: "fdb18a8d-2cde-49ac-a8d4-21bfef0c7233",
        createdAt: "2022-09-28T14:15:27.789Z",
        updatedAt: "2022-09-28T14:15:27.789Z",
        borrowerId: null,
    },
    {
        title: "doar",
        author: "tua",
        language: "en",
        image: null,
        description: null,
        isbn: null,
        publishYear: null,
        genres: [],
        tags: [],
        isReserved: false,
        ownerId: "c4e84abc-3e60-4fbd-ac3c-946dae48b6fc",
        identifier: "21b37d9a-5935-48af-baf7-92daad1bfc9e",
        createdAt: "2022-09-28T14:15:27.802Z",
        updatedAt: "2022-09-28T14:15:27.803Z",
        borrowerId: null,
    },
    {
        title: "Sons and Lovers",
        author: "D. H. Lawrence",
        language: "got",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Velit a reiciendis quia. Omnis dolores praesentium tempora ipsum provident nam. Ut dolor illo officia nihil. Voluptas vel voluptatem dolorum numquam. Qui dolor commodi.",
        isbn: "39b2c8af-8846-40ea-8ff6-9f55c2f9baab",
        publishYear: "2070-02-05T00:07:34.123Z",
        genres: ["Travel", "Contemporary"],
        tags: ["sour", "muddy", "competent"],
        isReserved: false,
        ownerId: "9f4a44dd-59ff-4b7c-b27f-14557b2d61c4",
        identifier: "5f1a0699-8a61-4f9e-8496-03875cf2b9d7",
        createdAt: "2022-09-28T19:01:00.397Z",
        updatedAt: "2022-09-28T19:01:00.418Z",
        borrowerId: null,
    },
    {
        title: "The Decameron",
        author: "Giovanni Boccaccio",
        language: "clj",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Eos odio distinctio et occaecati quibusdam reprehenderit fugiat. Delectus eos distinctio fugit quo. Vero vero molestiae illo ea autem voluptas consequatur. Rerum placeat sint. Vero ea hic cupiditate sunt alias eveniet perspiciatis vitae corporis. Enim voluptas est dolor aut blanditiis dolor ut fugiat. Rerum doloribus laboriosam adipisci.",
        isbn: "d184bd45-949b-4670-86fd-9e6eabd78688",
        publishYear: "2059-10-17T17:24:08.651Z",
        genres: ["Paranormal", "Development"],
        tags: ["scarce", "indolent", "sympathetic"],
        isReserved: false,
        ownerId: "1e7525fc-e0f9-4a73-950b-96d908564efb",
        identifier: "46902385-ba3a-4e81-9e33-e788e623ddda",
        createdAt: "2022-09-28T19:01:00.352Z",
        updatedAt: "2022-09-28T19:01:00.353Z",
        borrowerId: null,
    },
    {
        title: "doar",
        author: "tua",
        language: "en",
        image: null,
        description: null,
        isbn: null,
        publishYear: null,
        genres: [],
        tags: [],
        isReserved: false,
        ownerId: "1e7525fc-e0f9-4a73-950b-96d908564efb",
        identifier: "bc199fb9-45ca-4cf9-9796-e7c921584b25",
        createdAt: "2022-09-28T19:01:00.366Z",
        updatedAt: "2022-09-28T19:01:00.366Z",
        borrowerId: null,
    },
    {
        title: "Memoirs of Hadrian",
        author: "Marguerite Yourcenar",
        language: "li",
        image: "https://loremflickr.com/640/480/cats",
        description:
            "Sequi animi quisquam. Non et dolore vero officia rerum repellendus. Molestias ipsam qui. Numquam eum ducimus consequatur tempora et quis ab necessitatibus. Dolorem maiores est. Consequatur eveniet repudiandae enim fugit non reprehenderit consequatur. Eos quo et sit molestiae quidem aut dolorem quaerat repellendus.",
        isbn: "f2c5d7d5-3633-407e-9604-95f45ca36223",
        publishYear: "2016-03-26T08:31:44.683Z",
        genres: ["Travel", "Guide / How-to"],
        tags: ["piercing", "incomparable", "lame"],
        isReserved: true,
        ownerId: "b6a7ae03-baf1-40d3-87fb-b80a4a970459",
        identifier: "f99c70ba-f6e5-43e4-967e-f2a88f5b5fa2",
        createdAt: "2022-09-28T19:01:04.242Z",
        updatedAt: "2022-09-28T19:01:04.265Z",
        borrowerId: null,
    },
];

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Book Share/Components/BookGrid",
    component: BookGrid,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof BookGrid>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BookGrid> = (args) => (
    <BookGrid {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = { books: bookExamples, booksLoading: false };

export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = { books: bookExamples, booksLoading: true };
