import dynamodbLocal from 'dynamodb-local';

const port = 8000;

dynamodbLocal.install(() => {
  console.log(`Installing DynamoDB Local...`);
});

dynamodbLocal.launch(port, null, ['-sharedDb']).then(() => {
  console.log(`DynamoDB Local is running on port ${port}`);
  console.log(`Press Ctrl+C to stop`);
});

process.on('SIGINT', () => {
  dynamodbLocal.stop(port);
  process.exit(0);
});
