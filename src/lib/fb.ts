import axios from "axios";

type FacebookPost = {
  id: string;
  message?: string;
  created_time: string;
  attachments?: {
    data: Array<{
      media?: { image?: { src: string } };
      type?: string;
      url?: string;
      title?: string;
    }>;
  };
};

type FetchPostsResult = {
  posts: FacebookPost[];
  nextPage?: string;
};

class Facebook {
  _pageId: string;
  _accessToken: string;
  _maxPosts: number;

  constructor() {
    this._pageId = process.env.FACEBOOK_PAGE_ID || "";
    this._accessToken = process.env.FACEBOOK_ACCESS_TOKEN || "";
    this._maxPosts = 50;
  }

  async listPosts(afterCursor?: string): Promise<FetchPostsResult> {
    try {
      const url = `https://graph.facebook.com/v21.0/${this._pageId}/posts`;
      const params: any = {
        fields: "id,message,created_time,attachments{media,type,url,title}",
        limit: this._maxPosts,
        access_token: this._accessToken,
      };

      if (afterCursor) params.after = afterCursor;

      const response = await axios.get(url, { params });
      const data = response.data;

      const posts: FacebookPost[] = data.data;
      const nextPage = data.paging?.cursors?.after;

      return { posts, nextPage };
    } catch (error: any) {
      console.error(
        "Error fetching Facebook posts:",
        error.response?.data || error.message
      );
      return { posts: [] };
    }
  }
}

export const facebook = new Facebook();
