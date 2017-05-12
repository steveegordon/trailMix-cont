module ApplicationHelper

  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_path) unless @user == current_user
  end
end
