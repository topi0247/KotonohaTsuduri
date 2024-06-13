# user = User.first

# 30.times do |n|
#   post = Post.new
#   tag_counts = Random.rand(1..5)
#   tag_counts.times do |m|
#     post.tags << Tag.find_or_create_by(name: "タグ#{m}")
#   end

#   genre_counts = Random.rand(1..5)
#   genre_counts.times do |m|
#     post.genres << Genre.find_or_create_by(name: "ジャンル#{m}")
#   end

#   count = Random.rand(1..10)
#   count.times do |m|
#     letter = user.letters.new(name: "名もなき人", sentences: "こんにちは、#{m}回目の手紙です。")
#     post.letters << letter
#   end
#   post.save
# end