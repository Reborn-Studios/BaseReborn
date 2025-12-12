local isTextUIVisible = false
local currentTextUIContent = nil

function ShowTextUI(text, options)
  if currentTextUIContent == text then
    return
  end
  
  if not options then
    options = {}
  end
  
  options.text = text
  currentTextUIContent = text
  
  SendNUIMessage({
    action = "textUi",
    data = options
  })
  
  isTextUIVisible = true
end

function HideTextUI()
  SendNUIMessage({
    action = "textUiHide"
  })
  
  isTextUIVisible = false
  currentTextUIContent = nil
end

function IsTextUIOpen()
  return isTextUIVisible, currentTextUIContent
end