import { HTTP } from "../http";
import {
  parseUserGroupMemberResponse,
  parseUserGroupResponse,
} from "../parseResponse";
import type { UserGroupMemberResponse, UserGroupResponse } from "../types";

export class UserGroupsAPI {
  private http: HTTP;
  constructor(http: HTTP) {
    this.http = http;
  }

  async listForMe() {
    const response = await this.http.get<UserGroupResponse[]>(
      "v1/user-group/me"
    );
    return response.map((userGroup) => parseUserGroupResponse(userGroup));
  }

  async create(params: { name: string }) {
    const response = await this.http.post<UserGroupResponse>(
      "v1/user-group",
      params
    );
    return parseUserGroupResponse(response);
  }

  async listMembers(id: string) {
    const response = await this.http.get<UserGroupMemberResponse[]>(
      `v1/user-group/${id}/members`
    );
    return response.map((member) => parseUserGroupMemberResponse(member));
  }

  async inviteMember(
    id: string,
    params: {
      emailOrUsername: string;
      canCreatePhotoEvents: boolean;
      canInviteMembers: boolean;
    }
  ) {
    const response = await this.http.post<any>(`v1/user-group/${id}/members`, {
      emailOrUsername: params.emailOrUsername,
      canCreatePhotoEvents: params.canCreatePhotoEvents,
      canInviteMembers: params.canInviteMembers,
    });
    return response;
    // return response.map((member) => parseUserGroupMemberResponse(member));
  }
}
