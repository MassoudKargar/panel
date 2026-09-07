import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'dotnet' },
      update: {},
      create: { name: '.NET', slug: 'dotnet' },
    }),
    prisma.tag.upsert({
      where: { slug: 'aspnet-core' },
      update: {},
      create: { name: 'ASP.NET Core', slug: 'aspnet-core' },
    }),
    prisma.tag.upsert({
      where: { slug: 'csharp' },
      update: {},
      create: { name: 'C#', slug: 'csharp' },
    }),
    prisma.tag.upsert({
      where: { slug: 'backend' },
      update: {},
      create: { name: 'Backend', slug: 'backend' },
    }),
    prisma.tag.upsert({
      where: { slug: 'architecture' },
      update: {},
      create: { name: 'Architecture', slug: 'architecture' },
    }),
    prisma.tag.upsert({
      where: { slug: 'ai' },
      update: {},
      create: { name: 'AI', slug: 'ai' },
    }),
    prisma.tag.upsert({
      where: { slug: 'llms' },
      update: {},
      create: { name: 'LLMs', slug: 'llms' },
    }),
    prisma.tag.upsert({
      where: { slug: 'ai-agents' },
      update: {},
      create: { name: 'AI Agents', slug: 'ai-agents' },
    }),
    prisma.tag.upsert({
      where: { slug: 'mcp' },
      update: {},
      create: { name: 'MCP', slug: 'mcp' },
    }),
    prisma.tag.upsert({
      where: { slug: 'rag' },
      update: {},
      create: { name: 'RAG', slug: 'rag' },
    }),
    prisma.tag.upsert({
      where: { slug: 'distributed-systems' },
      update: {},
      create: { name: 'Distributed Systems', slug: 'distributed-systems' },
    }),
    prisma.tag.upsert({
      where: { slug: 'kafka' },
      update: {},
      create: { name: 'Kafka', slug: 'kafka' },
    }),
    prisma.tag.upsert({
      where: { slug: 'redis' },
      update: {},
      create: { name: 'Redis', slug: 'redis' },
    }),
    prisma.tag.upsert({
      where: { slug: 'docker' },
      update: {},
      create: { name: 'Docker', slug: 'docker' },
    }),
    prisma.tag.upsert({
      where: { slug: 'kubernetes' },
      update: {},
      create: { name: 'Kubernetes', slug: 'kubernetes' },
    }),
    prisma.tag.upsert({
      where: { slug: 'grpc' },
      update: {},
      create: { name: 'gRPC', slug: 'grpc' },
    }),
    prisma.tag.upsert({
      where: { slug: 'clean-architecture' },
      update: {},
      create: { name: 'Clean Architecture', slug: 'clean-architecture' },
    }),
    prisma.tag.upsert({
      where: { slug: 'ddd' },
      update: {},
      create: { name: 'DDD', slug: 'ddd' },
    }),
    prisma.tag.upsert({
      where: { slug: 'cqrs' },
      update: {},
      create: { name: 'CQRS', slug: 'cqrs' },
    }),
  ])

  const tagMap = Object.fromEntries(tags.map(t => [t.slug, t]))

  // Create blog posts
  const posts = [
    {
      slug: 'building-production-ready-ai-agents-dotnet-mcp',
      title: 'Building Production-Ready AI Agents with .NET and MCP',
      excerpt: 'A deep dive into creating robust, observable AI agents using the Model Context Protocol in .NET. Covers agent lifecycle, tool registration, error handling, and deployment patterns.',
      content: `# Building Production-Ready AI Agents with .NET and MCP

The Model Context Protocol (MCP) has emerged as the standard interface for connecting AI models to external tools and data sources. In this post, I'll walk through building production-ready AI agents in .NET that leverage MCP for seamless tool integration.

## Why MCP Matters

Traditional AI integrations suffer from tight coupling between models and tools. MCP solves this by providing a universal protocol that any model can use to discover and invoke tools.

\`\`\`csharp
// Register a tool with MCP
[McpTool("get_weather", "Get current weather for a location")]
public async Task<WeatherResponse> GetWeatherAsync(
    [McpParameter("location", "City name")] string location,
    CancellationToken ct = default)
{
    return await _weatherService.GetAsync(location, ct);
}
\`\`\`

## Agent Architecture

A production agent needs several concerns addressed:

1. **Lifecycle Management** — Startup, health checks, graceful shutdown
2. **Tool Registry** — Dynamic tool discovery and registration
3. **Error Handling** — Retry policies, circuit breakers, fallback responses
4. **Observability** — Structured logging, metrics, distributed tracing
5. **Security** — Authentication, authorization, rate limiting

## Implementation Patterns

### Dependency Injection Setup

\`\`\`csharp
services.AddMcpAgent(options =>
{
    options.ClientName = "production-agent";
    options.ProtocolVersion = "2024-11-05";
})
.AddTool<WeatherTool>()
.AddTool<DatabaseQueryTool>()
.AddTool<FileSystemTool>();
\`\`\`

### Structured Logging

\`\`\`csharp
_logger.LogInformation("Tool invoked: {ToolName}, Duration: {Duration}ms, Success: {Success}",
    toolName, stopwatch.ElapsedMilliseconds, success);
\`\`\`

## Deployment Considerations

- Containerize with multi-stage Docker builds
- Use health endpoints for orchestration
- Configure resource limits (CPU, memory)
- Implement graceful shutdown for in-flight requests

## Conclusion

MCP transforms AI agent development from custom integrations to standardized, maintainable systems. The .NET ecosystem provides excellent tooling for building production-grade agents.

Stay tuned for the next post where we'll explore distributed agent coordination.`,
      coverImage: null,
      published: true,
      featured: true,
      publishedAt: new Date('2024-12-15'),
      readingTime: 12,
      tagSlugs: ['dotnet', 'aspnet-core', 'csharp', 'ai', 'ai-agents', 'mcp'],
    },
    {
      slug: 'distributed-systems-patterns-event-driven-kafka',
      title: 'Distributed Systems Patterns: Event-Driven Architecture with Kafka',
      excerpt: 'Exploring event-driven patterns for building resilient distributed systems. Covers event sourcing, CQRS, saga patterns, and practical Kafka implementation strategies.',
      content: `# Distributed Systems Patterns: Event-Driven Architecture with Kafka

Event-driven architecture (EDA) has become the backbone of modern distributed systems. Let's explore the patterns that make it work at scale.

## Core Patterns

### Event Sourcing

Store state changes as a sequence of events rather than current state.

\`\`\`csharp
public class OrderAggregate : EventSourcedAggregate
{
    public void PlaceOrder(OrderDto dto)
    {
        if (_status != OrderStatus.Pending)
            throw new InvalidOperationException("Order already placed");

        RaiseEvent(new OrderPlacedEvent(dto.OrderId, dto.CustomerId, dto.Items));
    }

    protected override void Apply(OrderPlacedEvent @event)
    {
        _status = OrderStatus.Placed;
        _items = @event.Items;
    }
}
\`\`\`

### CQRS (Command Query Responsibility Segregation)

Separate read and write models for optimized performance.

### Saga Pattern

Manage distributed transactions across services.

## Kafka Implementation

\`\`\`csharp
// Producer with idempotency
var config = new ProducerConfig
{
    BootstrapServers = "kafka:9092",
    EnableIdempotence = true,
    Acks = Acks.All,
    MaxInFlight = 5,
};

using var producer = new ProducerBuilder<string, OrderEvent>(config).Build();
await producer.ProduceAsync("orders", new Message<string, OrderEvent>
{
    Key = orderId,
    Value = new OrderPlacedEvent(...)
});
\`\`\`

## Resilience Patterns

- **Outbox Pattern** — Guarantee event publishing with database transactions
- **Idempotent Consumers** — Handle duplicate messages gracefully
- **Dead Letter Queues** — Capture failed messages for inspection

## Monitoring

Track key metrics:
- Consumer lag
- Throughput (msg/sec)
- Error rates
- End-to-end latency

## Conclusion

EDA with Kafka provides the foundation for scalable, resilient systems. The patterns here apply whether you're building microservices, event-sourced domains, or real-time analytics pipelines.`,
      coverImage: null,
      published: true,
      featured: true,
      publishedAt: new Date('2024-11-28'),
      readingTime: 15,
      tagSlugs: ['distributed-systems', 'kafka', 'architecture', 'cqrs', 'backend'],
    },
    {
      slug: 'high-performance-caching-redis-dotnet',
      title: 'High-Performance Caching Strategies with Redis in .NET',
      excerpt: 'Master Redis caching patterns for .NET applications. Covers distributed caching, cache-aside, write-through, refresh-ahead, and advanced patterns like cache stampede prevention.',
      content: `# High-Performance Caching Strategies with Redis in .NET

Caching is often the highest-impact optimization for backend systems. Let's explore patterns that work at scale.

## Cache Patterns

### Cache-Aside (Lazy Loading)

\`\`\`csharp
public async Task<User> GetUserAsync(string id)
{
    var cacheKey = $"user:{id}";
    
    var cached = await _cache.GetStringAsync(cacheKey);
    if (cached != null) return JsonSerializer.Deserialize<User>(cached);

    var user = await _db.Users.FindAsync(id);
    if (user != null)
    {
        await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(user), 
            new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10) });
    }
    return user;
}
\`\`\`

### Write-Through

\`\`\`csharp
public async Task UpdateUserAsync(User user)
{
    await _db.Users.Update(user).SaveChangesAsync();
    
    var cacheKey = $"user:{user.Id}";
    await _cache.SetStringAsync(cacheKey, JsonSerializer.Serialize(user));
}
\`\`\`

### Refresh-Ahead (Prevent Stampede)

\`\`\`csharp
public async Task<T> GetOrRefreshAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl, TimeSpan refreshThreshold)
{
    var cached = await _cache.GetStringAsync(key);
    var entry = cached != null ? JsonSerializer.Deserialize<CacheEntry<T>>(cached) : null;

    if (entry != null && DateTime.UtcNow < entry.ExpiresAt - refreshThreshold)
    {
        // Background refresh
        _ = Task.Run(async () => 
        {
            var fresh = await factory();
            await _cache.SetStringAsync(key, JsonSerializer.Serialize(new CacheEntry<T>(fresh, DateTime.UtcNow + ttl)));
        });
        return entry.Value;
    }

    var value = await factory();
    await _cache.SetStringAsync(key, JsonSerializer.Serialize(new CacheEntry<T>(value, DateTime.UtcNow + ttl)));
    return value;
}
\`\`\`

## Advanced Patterns

### Cache Stampede Prevention

Use distributed locks or probabilistic early expiration.

### Multi-Level Caching

L1 (in-memory) + L2 (Redis) for ultra-low latency.

### Cache Invalidation Strategies

- TTL-based
- Event-driven (Redis pub/sub)
- Tag-based invalidation

## Redis Configuration for Production

\`\`\`redis
# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
\`\`\`

## Monitoring

Track hit ratio, latency percentiles, memory usage, eviction rate.

## Conclusion

Effective caching requires understanding your access patterns and choosing the right strategy. Start simple, measure, then optimize.`,
      coverImage: null,
      published: true,
      featured: false,
      publishedAt: new Date('2024-10-20'),
      readingTime: 10,
      tagSlugs: ['redis', 'dotnet', 'backend', 'architecture', 'csharp'],
    },
    {
      slug: 'implementing-rag-systems-prototype-production',
      title: 'Implementing RAG Systems: From Prototype to Production',
      excerpt: 'A comprehensive guide to building Retrieval-Augmented Generation systems. Covers chunking strategies, embedding models, vector databases, reranking, evaluation, and production hardening.',
      content: `# Implementing RAG Systems: From Prototype to Production

RAG combines the knowledge of LLMs with your private data. Here's how to build it right.

## Architecture Overview

\`\`\`
User Query → Embedding → Vector Search → Rerank → Context → LLM → Answer
\`\`\`

## Chunking Strategies

### Fixed-Size with Overlap

\`\`\`python
def chunk_text(text, chunk_size=512, overlap=50):
    tokens = tokenizer.encode(text)
    chunks = []
    for i in range(0, len(tokens), chunk_size - overlap):
        chunk = tokens[i:i + chunk_size]
        chunks.append(tokenizer.decode(chunk))
    return chunks
\`\`\`

### Semantic Chunking

Split on semantic boundaries (headings, paragraphs).

## Embedding Models

| Model | Dimensions | Use Case |
|-------|------------|----------|
| text-embedding-3-small | 1536 | General purpose |
| text-embedding-3-large | 3072 | High accuracy |
| bge-large-en-v1.5 | 1024 | Open source, strong |

## Vector Database Comparison

- **pgvector** — PostgreSQL extension, simple ops
- **Pinecone** — Managed, serverless
- **Weaviate** — Graph + vector, flexible
- **Qdrant** — Rust-based, fast, filtering

## Reranking

\`\`\`python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
scores = reranker.predict([(query, doc) for doc in retrieved_docs])
reranked = [doc for _, doc in sorted(zip(scores, retrieved_docs), reverse=True)]
\`\`\`

## Evaluation Framework

\`\`\`python
def evaluate_rag(queries, ground_truth, rag_system):
    metrics = {
        'faithfulness': 0,
        'answer_relevancy': 0,
        'context_precision': 0,
        'context_recall': 0,
    }
    // Use RAGAS or custom evaluators
    return metrics
\`\`\`

## Production Hardening

- Circuit breakers for LLM calls
- Request/response logging for debugging
- Cost tracking per query
- A/B testing framework
- Gradual rollout with feature flags

## Conclusion

RAG is more than vector search. Production systems need evaluation, monitoring, and iterative improvement. Start with a solid foundation, then optimize each component.`,
      coverImage: null,
      published: true,
      featured: true,
      publishedAt: new Date('2024-09-12'),
      readingTime: 18,
      tagSlugs: ['ai', 'llms', 'rag', 'backend', 'architecture'],
    },
    {
      slug: 'clean-architecture-aspnet-core-practical-guide',
      title: 'Clean Architecture in ASP.NET Core: A Practical Guide',
      excerpt: 'Implementing Clean Architecture in real-world .NET applications. Covers project structure, dependency rules, domain modeling, infrastructure, testing strategies, and common pitfalls.',
      content: `# Clean Architecture in ASP.NET Core: A Practical Guide

Clean Architecture isn't about folders—it's about dependency direction. Let's build it properly.

## Project Structure

\`\`\`
src/
├── Domain/           # Enterprise business rules
├── Application/      # Application business rules
├── Infrastructure/   # Frameworks, databases, external services
├── WebApi/           # Controllers, middleware, DI setup
└── Tests/
    ├── Unit/
    └── Integration/
\`\`\`

## Dependency Rule

> Inner layers must not depend on outer layers.

\`\`\`csharp
// Domain - no dependencies
public class Order
{
    public OrderId Id { get; }
    public CustomerId CustomerId { get; }
    public Money Total { get; private set; }
    
    public void AddItem(Product product, int quantity)
    {
        // Domain logic here
    }
}

// Application - depends on Domain
public interface IOrderRepository
{
    Task<Order> GetByIdAsync(OrderId id);
    Task SaveAsync(Order order);
}

// Infrastructure - implements Application interfaces
public class EfOrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;
    // Implementation...
}
\`\`\`

## Dependency Injection Setup

\`\`\`csharp
// Application layer
services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ApplicationAssembly).Assembly));
services.AddValidatorsFromAssembly(typeof(ApplicationAssembly).Assembly);

// Infrastructure layer
services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(connectionString));
services.AddScoped<IOrderRepository, EfOrderRepository>();
services.AddScoped<IEmailService, SmtpEmailService>();
\`\`\`

## Testing Strategy

- **Unit tests** — Domain logic, application handlers
- **Integration tests** — Repository implementations, API endpoints
- **Contract tests** — External service boundaries

## Common Pitfalls

1. **Anemic Domain Model** — Logic leaks to services
2. **Leaky Abstractions** — Infrastructure types in Domain
3. **Over-Engineering** — Not every CRUD app needs this

## Conclusion

Clean Architecture pays off in maintainability and testability. Start with the dependency rule, organize by feature, and let the structure emerge from your domain.`,
      coverImage: null,
      published: true,
      featured: false,
      publishedAt: new Date('2024-08-05'),
      readingTime: 14,
      tagSlugs: ['dotnet', 'aspnet-core', 'clean-architecture', 'architecture', 'backend', 'csharp'],
    },
    {
      slug: 'model-context-protocol-universal-interface-ai-tools',
      title: 'Model Context Protocol: The Universal Interface for AI Tools',
      excerpt: 'Understanding MCP — the open standard for connecting AI models to tools and data. Covers protocol basics, server/client implementation, transport layers, and building custom MCP servers.',
      content: `# Model Context Protocol: The Universal Interface for AI Tools

MCP is HTTP for AI-tool communication. Here's what you need to know.

## What is MCP?

A protocol that standardizes how AI models:
- Discover available tools
- Invoke tools with structured parameters
- Receive structured results
- Access resources (files, DBs, APIs)
- Use prompts (reusable templates)

## Protocol Primitives

### Tools

\`\`\`json
{
  "name": "query_database",
  "description": "Execute a read-only SQL query",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string" },
      "params": { "type": "array", "items": { "type": "string" } }
    },
    "required": ["query"]
  }
}
\`\`\`

### Resources

\`\`\`json
{
  "uri": "file:///data/reports/quarterly.pdf",
  "name": "Q4 Report",
  "mimeType": "application/pdf"
}
\`\`\`

### Prompts

\`\`\`json
{
  "name": "code_review",
  "description": "Review code for best practices",
  "arguments": [
    { "name": "language", "required": true },
    { "name": "focus", "required": false }
  ]
}
\`\`\`

## Transport Layers

### STDIO (Local)

\`\`\`bash
# Client spawns server process
npx @modelcontextprotocol/server-filesystem /allowed/path
\`\`\`

### HTTP/SSE (Remote)

\`\`\`csharp
// ASP.NET Core MCP Server
app.MapMcp("/mcp", options =>
{
    options.ServerInfo = new() { Name = "my-server", Version = "1.0" };
    options.AddTool<DatabaseQueryTool>();
    options.AddResource<FileSystemResource>();
});
\`\`\`

## Building Custom MCP Servers

\`\`\`csharp
[McpServerToolType]
public class GitHubTools
{
    private readonly IGitHubClient _client;

    [McpServerTool("search_repos"), Description("Search GitHub repositories")]
    public async Task<string> SearchRepos(
        [Description("Search query")] string query,
        [Description("Max results")] int limit = 10)
    {
        var results = await _client.Search.Repositories(new SearchRepositoriesRequest(query) { PerPage = limit });
        return JsonSerializer.Serialize(results.Items.Select(r => new { r.Name, r.Description, r.Url }));
    }
}
\`\`\`

## Security Considerations

- Tool sandboxing
- Parameter validation
- Rate limiting
- Audit logging
- Authentication/authorization

## Ecosystem

- Official SDKs: TypeScript, Python, C#, Go, Java
- Growing registry of pre-built servers
- IDE integrations (VS Code, Cursor, Windsurf)

## Conclusion

MCP eliminates the N×M integration problem. Build once, connect anywhere. The protocol is young but the momentum is real.`,
      coverImage: null,
      published: true,
      featured: false,
      publishedAt: new Date('2024-07-22'),
      readingTime: 11,
      tagSlugs: ['mcp', 'ai', 'ai-agents', 'llms', 'backend', 'architecture'],
    },
  ]

  for (const post of posts) {
    const { tagSlugs, ...postData } = post
    const existing = await prisma.post.findUnique({ where: { slug: postData.slug } })
    
    if (!existing) {
      await prisma.post.create({
        data: {
          ...postData,
          tags: {
            connect: tagSlugs.map(slug => ({ slug }))
          }
        }
      })
      console.log(`✅ Created post: ${postData.title}`)
    } else {
      console.log(`⏭️  Post already exists: ${postData.title}`)
    }
  }

  // Create projects
  const projects = [
    {
      slug: 'base-framework',
      title: 'Base Framework',
      description: 'Base framework for creating clean applications with Clean Architecture, CQRS, DDD, gRPC, MediatR, Docker, OpenTelemetry, RabbitMQ, Redis, Serilog. Available as NuGet template package.',
      content: '# Base Framework\n\nA comprehensive .NET solution template for building clean, maintainable applications following Clean Architecture principles.\n\n## Features\n\n- **Clean Architecture** — Proper separation of Domain, Application, Infrastructure layers\n- **CQRS & MediatR** — Command Query Responsibility Segregation with MediatR\n- **Domain-Driven Design** — Rich domain models, aggregates, value objects\n- **gRPC Support** — High-performance RPC communication\n- **Docker Ready** — Multi-stage builds, docker-compose for local development\n- **Observability** — OpenTelemetry, Serilog structured logging\n- **Messaging** — RabbitMQ integration for event-driven architectures\n- **Caching** — Redis distributed caching\n- **Template Package** — Install via `dotnet new install Base.Solution.Templates`\n\n## Architecture\n\n```\nsrc/\n├── Domain/           # Enterprise business rules\n├── Application/      # Application business rules (CQRS)\n├── Infrastructure/   # EF Core, Redis, RabbitMQ, gRPC\n├── WebApi/           # Controllers, middleware, DI\n└── Tests/\n    ├── Unit/\n    └── Integration/\n```\n\n## Technologies\n\n- .NET 8 / .NET 9\n- C# 12/13\n- ASP.NET Core\n- Entity Framework Core\n- MediatR\n- gRPC\n- RabbitMQ\n- Redis\n- OpenTelemetry\n- Serilog\n- Docker\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/Base\n- NuGet: https://www.nuget.org/packages/Base.Solution.Templates/',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/Base',
      liveUrl: 'https://www.nuget.org/packages/Base.Solution.Templates/',
      featured: true,
      technologies: ['.NET 8', 'C#', 'Clean Architecture', 'CQRS', 'DDD', 'gRPC', 'MediatR', 'Docker', 'OpenTelemetry', 'RabbitMQ', 'Redis', 'Serilog'],
    },
    {
      slug: 'crm-microservices',
      title: 'CRM Microservices Platform',
      description: 'Microservice .NET Platform for CRM with Clean Architecture, event-driven architecture, and distributed systems patterns.',
      content: '# CRM Microservices Platform\n\nA full-featured CRM platform built with microservices architecture on .NET.\n\n## Features\n\n- **Microservices Architecture** — Independent deployable services\n- **Event-Driven** — Kafka/RabbitMQ for inter-service communication\n- **Clean Architecture** — Each service follows Clean Architecture\n- **Domain-Driven Design** — Rich domain models per bounded context\n- **API Gateway** — Single entry point with YARP\n- **Identity & Access** — OAuth2/OIDC authentication\n- **Distributed Tracing** — OpenTelemetry integration\n- **Container Orchestration** — Kubernetes ready\n\n## Services\n\n- **Customer Service** — Customer management, profiles\n- **Sales Service** — Leads, opportunities, pipelines\n- **Communication Service** — Email, SMS, notifications\n- **Analytics Service** — Reporting and dashboards\n\n## Technologies\n\n- .NET 8\n- ASP.NET Core\n- Entity Framework Core\n- Kafka / RabbitMQ\n- Docker & Kubernetes\n- OpenTelemetry\n- YARP API Gateway\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/CRM',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/CRM',
      liveUrl: null,
      featured: true,
      technologies: ['.NET 8', 'C#', 'Microservices', 'Clean Architecture', 'Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'OpenTelemetry', 'YARP'],
    },
    {
      slug: 'webapi-professional',
      title: 'Professional WebAPI',
      description: 'Professional REST API design with ASP.NET Core WebAPI including JWT authentication, Swagger documentation, and best practices.',
      content: '# Professional WebAPI\n\nA reference implementation of professional REST API design with ASP.NET Core.\n\n## Features\n\n- **RESTful Design** — Proper HTTP semantics, status codes, resource modeling\n- **JWT Authentication** — Secure token-based authentication\n- **Swagger/OpenAPI** — Complete API documentation\n- **Validation** — FluentValidation for request validation\n- **Error Handling** — Consistent error responses (RFC 7807)\n- **Versioning** — API versioning support\n- **Rate Limiting** — Protect against abuse\n- **Health Checks** — Kubernetes readiness/liveness probes\n\n## Architecture\n\n```\nsrc/\n├── WebApi/\n│   ├── Controllers/\n│   ├── Middleware/\n│   ├── Filters/\n│   └── Extensions/\n├── Application/\n│   ├── Commands/\n│   ├── Queries/\n│   └── Validators/\n├── Domain/\n│   ├── Entities/\n│   ├── ValueObjects/\n│   └── Events/\n└── Infrastructure/\n    ├── Persistence/\n    ├── Authentication/\n    └── ExternalServices/\n```\n\n## Technologies\n\n- .NET 8\n- ASP.NET Core\n- JWT Bearer Authentication\n- Swashbuckle (Swagger)\n- FluentValidation\n- Serilog\n- Entity Framework Core\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/WebApi',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/WebApi',
      liveUrl: null,
      featured: true,
      technologies: ['.NET 8', 'C#', 'ASP.NET Core', 'JWT', 'Swagger', 'FluentValidation', 'REST API', 'Serilog'],
    },
    {
      slug: 'identity-dapper',
      title: 'Identity with Dapper',
      description: 'Authentication vs Authorization implementation using Dapper for high-performance data access in .NET.',
      content: '# Identity with Dapper\n\nHigh-performance authentication and authorization using Dapper micro-ORM.\n\n## Features\n\n- **Dapper ORM** — Lightweight, fast data access\n- **Custom Identity** — No ASP.NET Core Identity overhead\n- **JWT Tokens** — Secure authentication\n- **Role-Based Access** — Flexible authorization\n- **Password Hashing** — BCrypt/Argon2\n- **Refresh Tokens** — Token rotation for security\n- **Performance** — Minimal allocations, fast queries\n\n## Technologies\n\n- .NET 8\n- Dapper\n- BCrypt/Argon2\n- JWT\n- PostgreSQL / SQL Server\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/Identity_Dapper',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/Identity_Dapper',
      liveUrl: null,
      featured: false,
      technologies: ['.NET 8', 'C#', 'Dapper', 'JWT', 'Authentication', 'Authorization', 'BCrypt'],
    },
    {
      slug: 'mediatr-api',
      title: 'MediatR API Pattern',
      description: 'Implementation of CQRS pattern with MediatR in ASP.NET Core for clean separation of commands and queries.',
      content: '# MediatR API Pattern\n\nCQRS implementation using MediatR for clean command/query separation.\n\n## Features\n\n- **CQRS** — Separate read/write models\n- **MediatR** — In-process messaging\n- **Pipeline Behaviors** — Validation, logging, caching\n- **Request/Response** — Strongly typed\n- **Notifications** — Domain events\n\n## Technologies\n\n- .NET 8\n- MediatR\n- FluentValidation\n- ASP.NET Core\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/MediatRApi',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/MediatRApi',
      liveUrl: null,
      featured: false,
      technologies: ['.NET 8', 'C#', 'MediatR', 'CQRS', 'FluentValidation'],
    },
    {
      slug: 'polly-fault-handling',
      title: 'Polly Fault Handling',
      description: 'Fault handling with Polly and .NET 6 — retry policies, circuit breakers, timeouts, bulkheads, and fallback patterns.',
      content: '# Polly Fault Handling\n\nResilient .NET applications with Polly fault handling library.\n\n## Patterns Implemented\n\n- **Retry** — Exponential backoff, jitter\n- **Circuit Breaker** — Fail fast, prevent cascade\n- **Timeout** — Cancel long-running operations\n- **Bulkhead** — Limit concurrent operations\n- **Fallback** — Graceful degradation\n- **Policy Wrap** — Combine multiple policies\n\n## Technologies\n\n- .NET 6/8\n- Polly\n- ASP.NET Core\n- HttpClient Factory\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/PollyNET',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/PollyNET',
      liveUrl: null,
      featured: false,
      technologies: ['.NET 8', 'C#', 'Polly', 'Resilience', 'Circuit Breaker', 'Retry', 'Timeout'],
    },
    {
      slug: 'docker-elk-tls',
      title: 'Docker ELK with TLS',
      description: 'Secure ELK stack (Elasticsearch, Logstash, Kibana) deployment with Docker and TLS encryption.',
      content: '# Docker ELK with TLS\n\nProduction-ready ELK stack with TLS encryption for secure log aggregation.\n\n## Features\n\n- **Elasticsearch** — Distributed search and analytics\n- **Logstash** — Log processing pipeline\n- **Kibana** — Visualization and dashboards\n- **TLS Encryption** — Secure communication between components\n- **Docker Compose** — Easy deployment\n- **Certificate Management** — Automated cert generation\n\n## Architecture\n\n```\nFilebeat → Logstash (TLS) → Elasticsearch (TLS) ← Kibana (TLS)\n```\n\n## Technologies\n\n- Docker & Docker Compose\n- Elasticsearch\n- Logstash\n- Kibana\n- OpenSSL (certificates)\n- Filebeat\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/docker-elk-tls',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/docker-elk-tls',
      liveUrl: null,
      featured: false,
      technologies: ['Docker', 'Elasticsearch', 'Logstash', 'Kibana', 'TLS', 'Filebeat', 'OpenSSL'],
    },
    {
      slug: 'kubernetes-configs',
      title: 'Kubernetes Configurations',
      description: 'Kubernetes manifests and Helm charts for deploying .NET microservices with proper security, networking, and observability.',
      content: '# Kubernetes Configurations\n\nProduction-ready Kubernetes manifests for .NET microservices.\n\n## Features\n\n- **Helm Charts** — Templated, configurable deployments\n- **Security** — Network policies, RBAC, pod security standards\n- **Networking** — Ingress, services, service mesh ready\n- **Observability** — Prometheus, Grafana, OpenTelemetry\n- **Auto-scaling** — HPA, VPA configurations\n- **Secrets Management** — External secrets operator\n\n## Components\n\n- Deployments, StatefulSets, DaemonSets\n- Services (ClusterIP, LoadBalancer, Headless)\n- Ingress controllers (NGINX, Traefik)\n- ConfigMaps, Secrets\n- PersistentVolumes, PVCs\n\n## Technologies\n\n- Kubernetes\n- Helm\n- NGINX Ingress\n- Prometheus Operator\n- cert-manager\n- External Secrets Operator\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/K8S',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/K8S',
      liveUrl: null,
      featured: false,
      technologies: ['Kubernetes', 'Helm', 'Docker', 'Prometheus', 'Grafana', 'NGINX Ingress', 'cert-manager'],
    },
    {
      slug: 'trading-system',
      title: 'Trading System',
      description: 'Algorithmic trading system built with C# and .NET for financial markets.',
      content: '# Trading System\n\nHigh-performance algorithmic trading platform.\n\n## Features\n\n- **Market Data** — Real-time feeds, historical data\n- **Strategy Engine** — Pluggable trading strategies\n- **Risk Management** — Position limits, drawdown controls\n- **Order Management** — Execution algorithms, smart routing\n- **Backtesting** — Historical simulation\n- **Portfolio Management** — Multi-asset, multi-currency\n\n## Technologies\n\n- C# / .NET\n- High-performance computing\n- Financial protocols (FIX)\n- Time-series databases\n\n## Links\n\n- GitHub: https://github.com/MassoudKargar/Trading',
      image: null,
      githubUrl: 'https://github.com/MassoudKargar/Trading',
      liveUrl: null,
      featured: false,
      technologies: ['C#', '.NET', 'Algorithmic Trading', 'FIX Protocol', 'Risk Management'],
    },
  ]

  for (const project of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: project.slug } })
    
    if (!existing) {
      await prisma.project.create({ data: project })
      console.log(`✅ Created project: ${project.title}`)
    } else {
      console.log(`⏭️  Project already exists: ${project.title}`)
    }
  }

  console.log('🌱 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })