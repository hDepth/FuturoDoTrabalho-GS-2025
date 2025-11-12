import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from './Colors';

const ChatStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.md,
    backgroundColor: Colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  title: {
    ...Typography.title,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.caption,
    textAlign: 'center',
  },
  messageList: {
    flex: 1,
    padding: Spacing.md,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.sm,
    borderRadius: 8,
    marginBottom: Spacing.md,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  iaBubble: {
    backgroundColor: Colors.backgroundLight,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...Typography.body,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
    backgroundColor: Colors.backgroundLight,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    borderRadius: 8,
    padding: Spacing.sm,
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    ...Typography.body,
    fontWeight: 'bold',
  },
});

export default ChatStyles;