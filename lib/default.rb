# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

module PsaltirHelper

    def kafismas
        @items.select { |item| item[:kind] == 'kafisma' }
    end

    def sorted_kafismas
        kafismas.sort_by { |p| p[:number] }
    end

end

include PsaltirHelper

