class Task < ApplicationRecord
	include RankedModel
	ranks :row_order

	belongs_to :user

	enum status: ["pending", "completed"]

	def self.update_status elems
		ids = elems.values.collect{|x| x["id"]}
		elems.values.reverse.each_with_index do |ele, index|
			Task.find(ele["id"]).update :row_order_position => elems.values.count - index
		end
		return true
	end

	def toogle_status
		self.status = self.status == "pending" ? "completed" : "pending"
		self.save
		
	end
end
