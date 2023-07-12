import axios from "axios";

export const githubApi = axios.create({
    baseURL: "https://api.github.com/repos/facebook/react",
    headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "Bearer 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"
    },
});